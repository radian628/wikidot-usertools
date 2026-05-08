function licenseCheck(table: HTMLElement | null) {
  let imageLicense: string = "";
  if (!table) {
    return "ERROR: License not found. Check the page manually.";
  }
  if (table.innerText.search("Public domain") != -1) {
    imageLicense = "Public Domain";
  } else if (
    table.innerText.search(
      "Creative Commons CC0 1.0 Universal Public Domain Dedication",
    ) != -1
  ) {
    imageLicense = "CC0 1.0";
  } else if (
    table.innerText.search(
      "Creative Commons Attribution-Share Alike 4.0 International",
    ) != -1
  ) {
    imageLicense = "CC-BY-SA 4.0";
  } else if (
    table.innerText.search(
      "Creative Commons Attribution-Share Alike 3.0 Unported",
    ) != -1
  ) {
    imageLicense = "CC-BY-SA 3.0";
  } else if (table.innerText.search("ShareAlike 1.0") != -1) {
    //Bugged?
    imageLicense = "CC-BY-SA 1.0";
  } else if (
    table.innerText.search("Creative Commons Attribution-Share Alike 2.5") != -1
  ) {
    imageLicense = "CC-BY-SA 2.5";
  } else if (table.innerText.search("Creative Commons Attribution 2.0") != -1) {
    imageLicense = "CC-BY 2.0";
  } else if (table.innerText.search("Creative Commons Attribution 3.0") != -1) {
    imageLicense = "CC-BY 3.0";
  } else if (table.innerText.search("Creative Commons Attribution 4.0") != -1) {
    imageLicense = "CC-BY 4.0";
  }

  if (imageLicense == "") {
    imageLicense = "ERROR: Incompatible License or Other Error";
  }
  return imageLicense;
}
async function getWikimediaAttribution(filename: string) {
  const json = await (
    await fetch(
      `https://commons.wikimedia.org/w/api.php?action=parse&format=json&page=File%3A${filename}&formatversion=2&origin=*`,
    )
  ).json();

  if (!json.parse) return {};

  const dom = new DOMParser().parseFromString(json.parse.text, "text/html");

  const rows = dom.querySelectorAll("table tr");

  const props: {
    author?: string;
    license?: string;
  } = {};

  for (const row of Array.from(rows) as HTMLElement[]) {
    if ((row.children[0] as HTMLElement | undefined)?.innerText === "Author") {
      props.author = (row.children[1] as HTMLElement | undefined)?.innerText;
    }
  }

  props.license = licenseCheck(dom.querySelector(".licensetpl"));

  return props;
}
export type LicenseboxEntry = {
  filename?: string;
  sourceLink: string;
  oldFilename: string;
};

export async function generateLicensebox(licenseboxEntries: LicenseboxEntry[]) {
  return (
    await Promise.all(
      licenseboxEntries.map(async (l) => {
        const url = new URL(l.sourceLink, window.location.href);

        if (
          url.host === "commons.wikimedia.org" ||
          url.host === "upload.wikimedia.org"
        ) {
          const licenseInfo = await getWikimediaAttribution(l.oldFilename);

          return {
            ...l,
            ...licenseInfo,
          };
        } else {
          return {
            ...l,
          };
        }
      }),
    )
  )
    .map((licenseInfo) => {
      return `${
        licenseInfo.filename === undefined
          ? `ADD FILENAME FOR ${licenseInfo.sourceLink} HERE ONCE UPLOADED`
          : `> **Filename:** ${licenseInfo.filename}`
      }
${
  licenseInfo.filename !== licenseInfo.oldFilename
    ? `> **Name:** ${licenseInfo.oldFilename}\n`
    : ""
}> **Author:** ${licenseInfo.author?.trim() ?? "PUT AUTHOR HERE"} 
> **License:** ${licenseInfo.license ?? "PUT LICENSE HERE"} 
> **Source Link:** ${licenseInfo.sourceLink}`;
    })
    .join("\n\n");
}
