export async function getAllOffsets(baseURL: string) {
  baseURL = baseURL.replace(/\/offset\/.*$/g, "");

  let offsetLinks: string[] = [];

  let words = 0;
  let offset = 0;
  let lastOffset = "";

  // get all offsets
  for (; offset < 100; offset++) {
    // fetch current offset
    const offseturl = `${baseURL}/offset/${offset}`;
    const offsetString = await (await fetch(offseturl)).text();

    // parse current offset
    const dom = new DOMParser().parseFromString(offsetString, "text/html");

    // if it has an empty listpages box, assume that we ran out of offsets
    const listpagesBox = dom.querySelector("#page-content .list-pages-box");
    if (
      listpagesBox &&
      listpagesBox.childNodes.length === 1 &&
      listpagesBox.childNodes[0] instanceof Text
    )
      break;

    // don't count licenseboxes
    for (const e of Array.from(dom.querySelectorAll(".licensebox")))
      e.parentElement?.removeChild(e);

    // get approx words of article
    const pageContentText =
      (dom.querySelector("#page-content") as HTMLElement | undefined)
        ?.innerText ?? "";

    // stop if we ran out of offsets (we can tell if this offset is exactly the same as the last one)
    if (lastOffset === pageContentText) break;
    lastOffset = pageContentText;
    offsetLinks.push(offseturl);
  }

  return offsetLinks;
}
