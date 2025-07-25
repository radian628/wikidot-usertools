export async function crom(query: string): Promise<any> {
  return await (
    await fetch("https://apiv1.crom.avn.sh/graphql", {
      body: JSON.stringify({ query }),
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}
