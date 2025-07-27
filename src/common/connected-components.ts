import * as graphology from "graphology";
export function getConnectedComponents(
  graph: graphology.DirectedGraph
): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  const unvisitedNodes = new Set(graph.nodes());

  function getConnectedComponentsInner(node: string, component: Set<string>) {
    if (!unvisitedNodes.has(node)) {
      return;
    }
    unvisitedNodes.delete(node);
    component.add(node);
    out.set(node, component);
    const neighbors = graph.neighbors(node);
    for (const n of neighbors) {
      getConnectedComponentsInner(n, component);
    }
  }

  console.log("a");
  while (unvisitedNodes.size > 0) {
    const component = new Set<string>();
    const node = unvisitedNodes.values().next().value!;
    getConnectedComponentsInner(node, component);
  }
  console.log("b");

  return out;
}
