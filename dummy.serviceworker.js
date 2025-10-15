console.log("can i actually see debug output");

self.addEventListener("fetch", (event) => {
  console.log("got here", event.request.method, event.request.url);
  if (
    event.request.method === "POST" &&
    event.request.url === `${self.location.origin}/eval`
  ) {
    event.respondWith(
      (async () => {
        const bodyText = await event.request.text();
        return new Response(JSON.stringify(eval(bodyText)), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      })()
    );
  } else {
    event.respondWith(
      window.customFetchHandler
        ? window.customFetchHandler(event.request)
        : fetch(event.request)
    );
  }
});

self.addEventListener("install", () => {
  console.log("installed");
});

self.addEventListener("activate", () => {
  console.log("sw activate");
  clients.claim();
});
