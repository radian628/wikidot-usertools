import { parseGIF } from "gifuct-js";

function loadu32LE(u8arr: Uint8Array, idx: number) {
  return (
    u8arr[idx] +
    256 * u8arr[idx + 1] +
    65536 * u8arr[idx + 2] +
    16777216 * u8arr[idx + 3]
  );
}

// https://developers.google.com/speed/webp/docs/riff_container
export async function getWebpHeaders(file: Blob) {
  // convert webp to unsigned 8-bit integer array view
  const webpArray = await file.arrayBuffer();
  const u8arr = new Uint8Array(webpArray);

  // skip 12-bit webp header
  let idx = 12;

  let headerInfo: {
    name: string;
    size: number;
  }[] = [];

  while (idx < u8arr.length) {
    // get 32-bit chunk header identifier "fourCC" code
    let fourCC = "";
    for (let i = 0; i < 4; i++) fourCC += String.fromCharCode(u8arr[idx + i]);

    // get length of chunk
    const len = loadu32LE(u8arr, idx + 4);

    headerInfo.push({
      name: fourCC,
      size: len,
    });

    // go to next chunk (use len + 8 to account for size of header)
    idx += len + 8;
  }

  return headerInfo;
}

export async function isWebpAnimated(file: Blob) {
  const headers = await getWebpHeaders(file);

  // there is more than one "ANMF" (animation frame) chunk -> animated WEBP
  return headers.filter((h) => h.name === "ANMF").length > 1;
}

export async function isGifAnimated(file: Blob) {
  const gifArray = await file.arrayBuffer();
  const parsedGif = parseGIF(gifArray);
  return parsedGif.frames.length > 1;
}
