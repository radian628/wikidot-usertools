import * as graphology from "graphology";
import { lookupQuadtree, makeQuadtree } from "../common/quadtree.js";
import { getConnectedComponents } from "../common/connected-components.js";

let graph: graphology.DirectedGraph;

let connectedComponents: Map<string, Set<string>>;

export const wikiGraphWorkerInterface = {
  setGraph(g: ReturnType<graphology.DirectedGraph["export"]>) {
    graph = new graphology.DirectedGraph().import(g);
    for (const node of graph.nodes()) {
      const attrs = graph.getNodeAttributes(node);
      graph.setNodeAttribute(
        node,
        "mass",
        graph.degree(node) + 1 + Math.random() * 10
      );
      graph.setNodeAttribute(node, "x2", attrs.x);
      graph.setNodeAttribute(node, "y2", attrs.y);
    }
    connectedComponents = getConnectedComponents(graph);
  },
  applyIteration(repulsion: number, neighborAttraction: number) {
    applyCoordinateDescentForceIteration(graph, {
      repulsion,
      neighborAttraction,
    });
    return graph.nodes().map((n) => {
      const attribs = graph.getNodeAttributes(n);
      return {
        id: n,
        x: attribs.x,
        y: attribs.y,
      };
    });
  },
  moveNodeTo(node: string, x: number, y: number) {
    graph.setNodeAttribute(node, "x", x);
    graph.setNodeAttribute(node, "y", y);
    graph.setNodeAttribute(node, "x2", x);
    graph.setNodeAttribute(node, "y2", y);
  },
};

function applyForceBetween(
  graph: graphology.DirectedGraph,
  a: string,
  b: string,
  strength: number,
  perpendicularStrength: number = 0
) {
  const attrsA = graph.getNodeAttributes(a);
  const attrsB = graph.getNodeAttributes(b);

  const dx = attrsA.x - attrsB.x;
  const dy = attrsA.y - attrsB.y;
  const mag = Math.hypot(dx, dy);
  const forceX = (dx / mag) * strength + (-dy / mag) * perpendicularStrength;
  const forceY = (dy / mag) * strength + (dx / mag) * perpendicularStrength;

  graph.setNodeAttribute(a, "x2", attrsA.x2 + forceX / attrsA.mass);
  graph.setNodeAttribute(a, "y2", attrsA.y2 + forceY / attrsA.mass);
  graph.setNodeAttribute(b, "x2", attrsB.x2 - forceX / attrsB.mass);
  graph.setNodeAttribute(b, "y2", attrsB.y2 - forceY / attrsB.mass);
}

function makeSpatialHashTable(
  graph: graphology.DirectedGraph,
  xSize: number,
  ySize: number
) {
  let table: string[][] = [];

  for (let i = 0; i < (xSize + 1) * (ySize + 1); i++) {
    table.push([]);
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const node of graph.nodes()) {
    const attribs = graph.getNodeAttributes(node);

    minX = Math.min(minX, attribs.x);
    maxX = Math.max(maxX, attribs.x);
    minY = Math.min(minY, attribs.y);
    maxY = Math.max(maxY, attribs.y);
  }

  for (const node of graph.nodes()) {
    const attribs = graph.getNodeAttributes(node);

    let bucketX = Math.floor(((attribs.x - minX) / (maxX - minX)) * xSize);
    let bucketY = Math.floor(((attribs.y - minY) / (maxY - minY)) * ySize);

    let bucket = bucketX + bucketY * (xSize + 1);
    table[bucket].push(node);
  }

  return {
    x1: minX,
    y1: minY,
    x2: maxX,
    y2: maxY,
    xSize,
    ySize,
    table,
    getCandidatesWithinBox(
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): string[][] {
      const buckets: string[][] = [];
      let minBucketX = Math.max(
        0,
        Math.floor(((x1 - minX) / (maxX - minX)) * xSize)
      );
      let minBucketY = Math.max(
        0,
        Math.floor(((y1 - minY) / (maxY - minY)) * ySize)
      );

      let maxBucketX = Math.min(
        xSize + 1,
        Math.ceil(((x2 - minX) / (maxX - minX)) * xSize)
      );
      let maxBucketY = Math.min(
        ySize + 1,
        Math.ceil(((y2 - minY) / (maxY - minY)) * ySize)
      );

      for (let y = minBucketY; y < maxBucketY; y++) {
        for (let x = minBucketX; x < maxBucketX; x++) {
          let bucket = x + y * (xSize + 1);
          if (table[bucket]) buckets.push(table[bucket]);
        }
      }

      return buckets;
    },
  };
}

function getRepulsionRadius(graph: graphology.DirectedGraph, node: string) {
  return Math.max(graph.getNodeAttribute(node, "mass") ** 0.9 * 10, 20);
}

export function applyCoordinateDescentForceIteration(
  graph: graphology.DirectedGraph,
  options: {
    repulsion: number;
    neighborAttraction: number;
  }
) {
  let connectedComponentCenters = new Map<
    Set<string>,
    { x: number; y: number }
  >();

  const connectedComponentSets = new Set(connectedComponents.values());

  for (const comp of connectedComponentSets) {
    let x = 0;
    let y = 0;

    for (const node of comp) {
      const attrs = graph.getNodeAttributes(node);
      x += attrs.x;
      y += attrs.y;
    }

    x /= comp.size;
    y /= comp.size;

    connectedComponentCenters.set(comp, {
      x,
      y,
    });
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const node of graph.nodes()) {
    const attribs = graph.getNodeAttributes(node);

    minX = Math.min(minX, attribs.x);
    maxX = Math.max(maxX, attribs.x);
    minY = Math.min(minY, attribs.y);
    maxY = Math.max(maxY, attribs.y);
  }

  // console.time("a");
  // console.time("c");
  const qt = makeQuadtree(
    graph.nodes().map((n) => {
      const attrs = graph.getNodeAttributes(n);
      return {
        id: n,
        x: attrs.x,
        y: attrs.y,
      };
    }),
    minX,
    minY,
    maxX,
    maxY,
    1,
    15
  );

  // console.timeEnd("c");

  let nodesChecked = 0;

  // make nodes go away from each other
  for (const node of graph.nodes()) {
    const attribs = graph.getNodeAttributes(node);
    const degree = graph.degree(node);
    const repulsionRadius = getRepulsionRadius(graph, node);

    const pts = lookupQuadtree(
      qt,
      attribs.x - repulsionRadius,
      attribs.y - repulsionRadius,
      attribs.x + repulsionRadius,
      attribs.y + repulsionRadius
    );

    for (const pt of pts) {
      nodesChecked++;
      const dx = pt.x - attribs.x;
      const dy = pt.y - attribs.y;
      const mag = Math.hypot(dx, dy);

      if (mag < repulsionRadius && mag !== 0 && pt.id !== node) {
        applyForceBetween(
          graph,
          node,
          pt.id,
          Math.max(
            0,
            Math.min(
              10,
              (options.repulsion *
                repulsionRadius *
                graph.getNodeAttribute(pt.id, "mass")) /
                mag
            )
          ),
          (Math.random() - 0.5) * options.repulsion * 2
        );
      }
    }
  }
  // console.timeEnd("a");
  // console.log("checked:", nodesChecked / graph.nodes().length);

  // console.time("b");
  // move nodes toward their neighbors
  for (const node of graph.nodes()) {
    const neighbors = graph
      .inboundNeighbors(node)
      .concat(graph.outboundNeighbors(node));
    let attribs = graph.getNodeAttributes(node);
    const repulsionRadius = getRepulsionRadius(graph, node);
    let neighborcount = neighbors.length;

    for (const neighbor of neighbors) {
      const targetAttribs = graph.getNodeAttributes(neighbor);
      let edgeCount = graph.degree(neighbor);
      const dx = targetAttribs.x - attribs.x;
      const dy = targetAttribs.y - attribs.y;
      const mag = Math.hypot(dx, dy);

      if (mag !== 0 && mag > repulsionRadius) {
        applyForceBetween(
          graph,
          node,
          neighbor,
          (-options.neighborAttraction * mag ** 0.7) / (neighborcount + 1)
        );
      }
    }
  }
  // console.timeEnd("b");

  for (const node of graph.nodes()) {
    const comp = connectedComponents.get(node)!;
    if (comp.size <= 1) continue;
    let center = connectedComponentCenters.get(comp)!;

    const attrs = graph.getNodeAttributes(node);
    const dx = attrs.x - center.x;
    const dy = attrs.y - center.y;
    const mag = Math.hypot(dx, dy);
    if (mag > 0.1) {
      const forceMag = 0.005 * mag ** 0.5 * options.neighborAttraction;
      graph.setNodeAttribute(node, "x2", attrs.x2 + (dx / mag) * forceMag);
      graph.setNodeAttribute(node, "y2", attrs.y2 + (dy / mag) * forceMag);
    }
  }

  for (const node of graph.nodes()) {
    const attrs = graph.getNodeAttributes(node);
    graph.setNodeAttribute(node, "x", attrs.x2);
    graph.setNodeAttribute(node, "y", attrs.y2);
  }
}
