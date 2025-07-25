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
  return a * x + b * (1 - x);
}

let angleOffsets: number[] = [];
for (let i = 0; i < 30000; i++) {
  angleOffsets.push(Math.random() * Math.PI * 2);
}

function applyCircleIteration(graph: graphology.DirectedGraph) {
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
      const rad = Math.pow(neighborCount, 0.6) + 25;
      let nx = Math.cos(angle) * rad + nodeData.x;
      let ny = Math.sin(angle) * rad + nodeData.y;

      const attribs = graph.getNodeAttributes(neighbors[i]);

      // let influence = Math.pow(
      //   -1 / (neighborCountMap.get(neighbors[i])! + 1),
      //   50
      // );
      let influence = 0.01;

      graph.setNodeAttribute(neighbors[i], "x", lerp(attribs.x, nx, influence));
      graph.setNodeAttribute(neighbors[i], "y", lerp(attribs.y, ny, influence));
    }

    // graph.setNodeAttribute(node, "x", nodeData.x * 1.1);
    // graph.setNodeAttribute(node, "y", nodeData.y * 1.1);
    i++;
  }
}

(async () => {
  const graphRaw: WikiGraph = await (await fetch("../build/links.json")).json();
  // console.log(graph);
  const graph = new graphology.DirectedGraph();

  const data: Data = { nodes: [], links: [] };

  const nodeColors = new Map<string, [number, number, number]>();

  let i = 0;
  const graphCount = Object.entries(graphRaw).length;

  for (const [url, article] of Object.entries(graphRaw)) {
    // data.nodes.push({
    //   id: url,
    //   group: "1",
    //   radius: 1,
    // });
    nodeColors.set(url, [i / graphCount, 1, 0.6]);
    const colorRgb = hslToRgb(...nodeColors.get(url)!);
    const color = rgb2hex(colorRgb);
    graph.addNode(url, {
      label: url,
      size: Math.pow(article.links.length, 0.25) + 1,
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
          size: 0.01,
          color: rgb2hex(hslToRgb(...color)),
        });
        // data.links.push({
        //   source: url,
        //   target: targetUrl,
        //   value: 1,
        // });
      }
    }
  }

  random.assign(graph);
  // setInterval(() => {
  // console.log(graph.nodes().length);
  applyCircleIteration(graph);
  // console.log(graph.nodes().length);
  // }, 500);
  // forceAtlas2.assign(graph, {
  //   iterations: 100,
  //   settings: {
  //     gravity: 10,
  //   },
  // });

  // const layout = new FA2Layout(graph, {
  //   settings: { gravity: 1 },
  // });
  // const layout = new NoverlapLayout(graph, {
  //   settings: {
  //     gridSize: 10,
  //   },
  // });

  // layout.start();

  document.body.style.height = "100vh";

  const sigma = new Sigma(graph, document.body);
})();
// const data = {
//   nodes: [
//     {
//       id: "a",
//       group: "a",
//       radius: 1,
//     },
//     {
//       id: "b",
//       group: "a",
//       radius: 1,
//     },
//     {
//       id: "c",
//       group: "a",
//       radius: 1,
//     },
//   ],

//   links: [
//     { source: "a", target: "b", value: 1 },
//     { source: "b", target: "c", value: 1 },
//     { source: "c", target: "a", value: 1 },
//   ],
// };

//   {
//     // Specify the dimensions of the chart.
//     const width = 928;
//     const height = 680;

//     // Specify the color scale.
//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     // The force simulation mutates links and nodes, so create a copy
//     // so that re-evaluating this cell produces the same result.
//     const links = data.links.map((d) => ({ ...d })) as LinkType[];
//     const nodes = data.nodes.map((d) => ({ ...d })) as NodeType[];

//     type NodeType = (typeof data.nodes)[0] & d3.SimulationNodeDatum;

//     type LinkType = {
//       source: NodeType;
//       target: NodeType;
//       index: number;
//       value: number;
//     } & d3.SimulationLinkDatum<NodeType>;

//     // Create a simulation with several forces.
//     const simulation = d3
//       .forceSimulation<NodeType, LinkType>(nodes)
//       .force(
//         "link",
//         d3
//           .forceLink<NodeType, LinkType>(links as unknown as LinkType[])
//           .id((d) => d.id)
//       )
//       .force("charge", d3.forceManyBody())
//       .force("x", d3.forceX())
//       .force("y", d3.forceY());

//     // Create the SVG container.
//     const svg = d3
//       .create("svg")
//       .attr("width", width * 4)
//       .attr("height", height * 4)
//       .attr("viewBox", [
//         (-width / 2) * 4,
//         (-height / 2) * 4,
//         width * 4,
//         height * 4,
//       ])
//       .attr("style", "max-width: 100%; height: auto;");

//     // Add a line for each link, and a circle for each node.
//     const link = svg
//       .append("g")
//       .attr("stroke", "#999")
//       .attr("stroke-opacity", 0.6)
//       .selectAll("line")
//       .data(links)
//       .join("line")
//       .attr("stroke-width", (d) => Math.sqrt(d.value));

//     const node = svg
//       .append("g")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 1.5)
//       .selectAll("circle")
//       .data(nodes)
//       .join("circle")
//       .attr("r", 5)
//       .attr("fill", (d) => color(d.group));

//     node.append("title").text((d) => d.id);

//     // // Add a drag behavior.
//     // node.call(
//     //   d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
//     // );

//     // Set the position attributes of links and nodes each time the simulation ticks.
//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d) => d.source.x ?? 0)
//         .attr("y1", (d) => d.source.y ?? 0)
//         .attr("x2", (d) => d.target.x ?? 0)
//         .attr("y2", (d) => d.target.y ?? 0);

//       node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
//     });

//     // Reheat the simulation when drag starts, and fix the subject position.
//     // function dragstarted(event) {
//     //   if (!event.active) simulation.alphaTarget(0.3).restart();
//     //   event.subject.fx = event.subject.x;
//     //   event.subject.fy = event.subject.y;
//     // }

//     // // Update the subject (dragged node) position during drag.
//     // function dragged(event) {
//     //   event.subject.fx = event.x;
//     //   event.subject.fy = event.y;
//     // }

//     // // Restore the target alpha so the simulation cools after dragging ends.
//     // // Unfix the subject position now that it’s no longer being dragged.
//     // function dragended(event) {
//     //   if (!event.active) simulation.alphaTarget(0);
//     //   event.subject.fx = null;
//     //   event.subject.fy = null;
//     // }

//     // When this cell is re-run, stop the previous simulation. (This doesn’t
//     // really matter since the target alpha is zero and the simulation will
//     // stop naturally, but it’s a good practice.)
//     // invalidation.then(() => simulation.stop());

//     document.body.appendChild(svg.node()!);

//     // return svg.node();
//   }
// })();
