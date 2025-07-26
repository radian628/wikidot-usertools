import * as graphology from "graphology";

let graph: graphology.DirectedGraph;

export const wikiGraphWorkerInterface = {
  setGraph(g: ReturnType<graphology.DirectedGraph["export"]>) {
    graph = new graphology.DirectedGraph().import(g);
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
};

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

export function applyCoordinateDescentForceIteration(
  graph: graphology.DirectedGraph,
  options: {
    repulsion: number;
    neighborAttraction: number;
  }
) {
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

  console.time("a");
  console.time("c");
  const ht = makeSpatialHashTable(graph, 100, 100);
  let repulsionRadius = 50;
  console.timeEnd("c");

  let nodesChecked = 0;

  // make nodes go away from each other
  for (const node of graph.nodes()) {
    const attribs = graph.getNodeAttributes(node);

    let x = attribs.x;
    let y = attribs.y;

    const buckets = ht.getCandidatesWithinBox(
      attribs.x - repulsionRadius,
      attribs.y - repulsionRadius,
      attribs.x + repulsionRadius,
      attribs.y + repulsionRadius
    );

    for (const bkt of buckets) {
      for (const targetNode of bkt) {
        nodesChecked++;
        const targetAttribs = graph.getNodeAttributes(targetNode);
        const dx = targetAttribs.x - attribs.x;
        const dy = targetAttribs.y - attribs.y;
        const mag = Math.hypot(dx, dy);

        if (mag < repulsionRadius && mag !== 0) {
          const forceMag = Math.min(3, 50 / mag) * options.repulsion;
          x -= (dx / mag) * forceMag;
          y -= (dy / mag) * forceMag;
        }
      }
    }

    graph.setNodeAttribute(node, "x", x);
    graph.setNodeAttribute(node, "y", y);
  }
  console.timeEnd("a");
  console.log("checked:", nodesChecked / graph.nodes().length);

  console.time("b");
  // move nodes toward their neighbors
  for (const node of graph.nodes()) {
    const neighbors = graph
      .inboundNeighbors(node)
      .concat(graph.outboundNeighbors(node));
    const attribs = graph.getNodeAttributes(node);
    let x = attribs.x;
    let y = attribs.y;
    let neighborcount = neighbors.length;

    for (const neighbor of neighbors) {
      const targetAttribs = graph.getNodeAttributes(neighbor);
      const dx = targetAttribs.x - attribs.x;
      const dy = targetAttribs.y - attribs.y;
      const mag = Math.hypot(dx, dy);

      const forceMag =
        (Math.sqrt(mag) * options.neighborAttraction) / (neighborcount + 1);
      if (mag !== 0 && mag > repulsionRadius + forceMag) {
        x += (dx / mag) * forceMag;
        y += (dy / mag) * forceMag;
      }
    }

    graph.setNodeAttribute(node, "x", x);
    graph.setNodeAttribute(node, "y", y);
  }
  console.timeEnd("b");
}
