import * as d3 from "d3";
import { wait } from "../common/wait.js";
import { crom } from "../common/crom.js";
import { throttle } from "../common/throttle.js";
import * as graphology from "graphology";
import { random } from "graphology-layout";
import forceAtlas2 from "graphology-layout-forceatlas2";
import FA2Layout from "graphology-layout-forceatlas2/worker.js";
import NoverlapLayout from "graphology-layout-noverlap/worker.js";
import Sigma from "sigma";
import { workerifyClient } from "../common/workerify.js";
import type { wikiGraphWorkerInterface } from "./wiki-article-graph-worker-interface.js";
import { getConnectedComponents } from "../common/connected-components.js";

type WikiGraph = Record<
  string,
  {
    links: string[];
    children: string[];
  }
>;

type Data = {
  nodes: { id: string; group: string; radius: number }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function rgb2hex([r, g, b]: number[]) {
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function lerp(a: number, b: number, x: number) {
  return a * (1 - x) + b * x;
}

let angleOffsets: number[] = [];
for (let i = 0; i < 30000; i++) {
  angleOffsets.push(Math.random() * Math.PI * 2);
}

function applyCircleIteration(
  graph: graphology.DirectedGraph,
  influence: number
) {
  let neighborCountMap = new Map<string, number>();

  for (const node of graph.nodes()) {
    const neighbors = graph.outboundNeighbors(node);
    let neighborCount = neighbors.length;
    neighborCountMap.set(node, neighborCount);
  }

  let i = 0;
  for (const node of graph.nodes()) {
    const neighbors = graph.outboundNeighbors(node);
    let neighborCount = neighbors.length;
    const nodeData = graph.getNodeAttributes(node);

    let angleOffset = angleOffsets[i];
    for (let i = 0; i < neighborCount; i++) {
      let angle = (Math.PI * 2 * i) / neighborCount + angleOffset;
      const rad = Math.pow(neighborCount, 0.7) + 200;
      let nx = Math.cos(angle) * rad + nodeData.x;
      let ny = Math.sin(angle) * rad + nodeData.y;

      const attribs = graph.getNodeAttributes(neighbors[i]);

      // let influence = Math.pow(
      //   -1 / (neighborCountMap.get(neighbors[i])! + 1),
      //   50
      // );

      graph.setNodeAttribute(neighbors[i], "x", lerp(attribs.x, nx, influence));
      graph.setNodeAttribute(neighbors[i], "y", lerp(attribs.y, ny, influence));
    }

    graph.setNodeAttribute(node, "x", nodeData.x * 1.02);
    graph.setNodeAttribute(node, "y", nodeData.y * 1.02);
    i++;
  }
}

const worker = new Worker(
  "../build/wiki-article-graph/wiki-article-graph-worker.js"
);

let positions: { id: string; x: number; y: number }[] = [];

const workerClient = workerifyClient<typeof wikiGraphWorkerInterface>(
  "graph",
  (req) => {
    worker.addEventListener("message", (e) => req(e.data));
    return () => {};
  },
  (res) => {
    worker.postMessage(res);
  }
);

void (async () => {
  let graphRaw: WikiGraph = await (await fetch("../build/links.json")).json();

  graphRaw = Object.fromEntries(
    Object.entries(graphRaw)
      // .slice(0, 3000)
      .filter(([k, v]) => !!k.match(/\/scp-\d{1,4}$/g))
  );

  const graph = new graphology.DirectedGraph();

  const data: Data = { nodes: [], links: [] };

  const nodeColors = new Map<string, [number, number, number]>();

  let i = 0;
  const graphCount = Object.entries(graphRaw).length;

  for (const [url, article] of Object.entries(graphRaw)) {
    nodeColors.set(url, [i / graphCount, 1, 0.6]);
    const colorRgb = hslToRgb(...nodeColors.get(url)!);
    const color = rgb2hex(colorRgb);
    graph.addNode(url, {
      label: url.replace("http://scp-wiki.wikidot.com/", ""),
      color,
    });
    i++;
  }

  for (const [url, article] of Object.entries(graphRaw)) {
    for (const slug of new Set(article.links)) {
      const targetUrl = `http://scp-wiki.wikidot.com${slug}`;
      if (graphRaw[targetUrl]) {
        const color: [number, number, number] = nodeColors
          .get(url)!
          .concat() as any;
        color[2] = 0.85;
        graph.addDirectedEdge(url, targetUrl, {
          size: 1,
          color: rgb2hex(hslToRgb(...color)),
        });
      }
    }
  }

  for (const node of graph.nodes()) {
    const degree = graph.degree(node);
    graph.setNodeAttribute(node, "size", 1 + 5 * degree ** 0.3);
  }

  random.assign(graph, {
    dimensions: ["x", "y"],
    scale: 4000,
  });

  // for (let i = 1; i < 10; i++) applyCircleIteration(graph, 1 / i);
  const comps = getConnectedComponents(graph);

  let largestComponent = [...new Set(comps.values())].reduce((prev, curr) =>
    prev.size > curr.size ? prev : curr
  );

  for (const node of graph.nodes()) {
    if (!largestComponent.has(node)) {
      graph.dropNode(node);
    }
  }

  await workerClient.setGraph(graph.export());

  let iters = 1;
  void (async () => {
    while (true) {
      positions = await workerClient.applyIteration(
        // Math.min(iters * 0.01 + 1, 1),
        Math.min(3000, iters * 10) / Math.pow(iters, 0.6),
        // 0
        (100 / Math.pow(iters, 0.6)) * (iters % 50 === 0 ? 10 : 1)
        // (350 / Math.sqrt(iters)) * 0.1
      );
      iters++;
    }
  })();

  let idx = 0;

  document.body.style.height = "100vh";

  const sigma = new Sigma(graph, document.body);

  let animLoop = (t: number) => {
    for (const p of positions) {
      const attribs = graph.getNodeAttributes(p.id);
      graph.setNodeAttribute(p.id, "x", lerp(attribs.x, p.x, 0.1));
      graph.setNodeAttribute(p.id, "y", lerp(attribs.y, p.y, 0.1));
    }
    sigma.scheduleRefresh();
    idx++;
    setTimeout(animLoop);
  };

  animLoop(0);

  let oldEdgeSettings: { id: string; color: string; size: number }[] = [];

  function highlightNeighbors(node: string, maxDepth: number) {
    const visited = new Set<string>();

    const queue: { depth: number; node: string }[] = [
      {
        node,
        depth: 1,
      },
    ];

    while (queue.length > 0) {
      const qi = queue.shift()!;
      if (qi.depth === maxDepth) continue;
      const color = rgb2hex(hslToRgb(0.5 + 0.1 * qi.depth, 1, 0.5));
      const node = qi.node;
      for (const n of graph.neighbors(node)) {
        const edgeOut = graph.edge(node, n);
        const edgeIn = graph.edge(n, node);

        let isvisited = false;

        if (edgeOut && visited.has(edgeOut)) isvisited = true;
        if (edgeIn && visited.has(edgeIn)) isvisited = true;

        if (isvisited) continue;

        for (const edge of [
          ...(edgeOut ? [edgeOut] : []),
          ...(edgeIn ? [edgeIn] : []),
        ]) {
          oldEdgeSettings.push({
            color: graph.getEdgeAttribute(edge, "color"),
            size: graph.getEdgeAttribute(edge, "size"),
            id: edge,
          });
          graph.setEdgeAttribute(edge, "color", color);
          graph.setEdgeAttribute(edge, "size", 14 / qi.depth);
          visited.add(edge);
        }

        queue.push({ depth: qi.depth + 1, node: n });
      }
    }
  }

  sigma.on("enterNode", (e) => {
    highlightNeighbors(e.node, 7);
    // const neighbors = graph.outboundEdges(e.node);
    // for (const n of neighbors) {
    //   oldEdgeSettings.push({
    //     color: graph.getEdgeAttribute(n, "color"),
    //     size: graph.getEdgeAttribute(n, "size"),
    //     id: n,
    //   });
    //   graph.setEdgeAttribute(n, "color", "orange");
    //   graph.setEdgeAttribute(n, "size", 5);
    // }
    // const neighborsIn = graph.inboundEdges(e.node);
    // for (const n of neighborsIn) {
    //   oldEdgeSettings.push({
    //     color: graph.getEdgeAttribute(n, "color"),
    //     size: graph.getEdgeAttribute(n, "size"),
    //     id: n,
    //   });
    //   graph.setEdgeAttribute(n, "color", "blue");
    //   graph.setEdgeAttribute(n, "size", 5);
    // }
  });

  sigma.on("leaveNode", (e) => {
    for (const c of oldEdgeSettings) {
      graph.setEdgeAttribute(c.id, "color", c.color);
      graph.setEdgeAttribute(c.id, "size", c.size);
    }
    oldEdgeSettings = [];
  });
})();
