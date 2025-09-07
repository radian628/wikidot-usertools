import { BatchInterceptor } from "@mswjs/interceptors";
import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";
import { FetchInterceptor } from "@mswjs/interceptors/fetch";
import { ArrayMap } from "r628";
import {
  defaultCacheHttpRequest,
  SerializedResponse,
} from "./net-request-serialization.js";

declare const NETWORK_REQUESTS_CACHE_URL: string;

let cached: ArrayMap<any, SerializedResponse> | undefined;
async function getNetworkRequestsCache(): Promise<
  ArrayMap<any, SerializedResponse>
> {
  if (cached) return cached;
  const json = await (await fetch(NETWORK_REQUESTS_CACHE_URL)).json();
  cached = ArrayMap.fromSerialized(json);
  return cached;
}

const interceptor = new BatchInterceptor({
  name: "interceptor",
  interceptors: [new XMLHttpRequestInterceptor(), new FetchInterceptor()],
});

interceptor.apply();

interceptor.on("request", async ({ request, controller }) => {
  if (!request.url.startsWith("http")) return;
  const cache = await getNetworkRequestsCache();

  const res = cache.get(await defaultCacheHttpRequest(request));

  console.log("INJECTOR GOT REQUEST", request, res);

  if (res) {
    controller.respondWith(
      new Response(res.body ? await (await fetch(res.body)).blob() : null, {
        headers: res.headers,
        status: res.status,
      })
    );
  }
});
