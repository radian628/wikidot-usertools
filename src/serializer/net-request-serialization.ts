export type SerializedResponse = {
  status: number;
  body?: string; // base64
  headers: ReturnType<Headers["toJSON"]>;
};
export async function defaultCacheHttpRequest(
  request: Request
): Promise<[any, ...any]> {
  try {
    let json = await request.clone().json();
    if (json !== null) {
      delete json.wikidot_token7;
    }
    return [request.method, request.url, JSON.stringify(json)];
  } catch (e) {
    return [request.method, request.url, request.body];
  }
}

////
