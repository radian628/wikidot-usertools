import { range } from "r628";
import { requestModuleAsync } from "./request-module-async.js";

export async function uploadFile(
  name: string,
  file: Blob,
  comments: string,
  pageId: string,
) {
  const formdata = new FormData();
  formdata.append("action", "FileAction");
  formdata.append("event", "uploadFile");
  formdata.append("page_id", pageId);
  formdata.append("MAX_FILE_SIZE", "209715200");
  formdata.append("userfile", file);
  formdata.append("dfilename", name);
  formdata.append("comments", comments);
  return (
    await fetch(window.location.origin + "/default--flow/files__UploadTarget", {
      method: "post",
      body: formdata,
    })
  ).ok;
}

export async function getFileIds(pageId: string) {
  return {
    ids: new Map(
      (await getAllFileInfo(pageId)).info.entries().map(([k, v]) => [k, v.id]),
    ),
  };
}

export type FileInfo = {
  size: number;
  id: string;
  name: string;
};

export async function getFileInfo(pageId: string, page?: number) {
  const table = await requestModuleAsync("files/PageFilesModule", {
    page_id: pageId,
    page: page?.toString(),
  });
  const dom = new DOMParser().parseFromString(table.body, "text/html");

  let idmap = new Map<string, FileInfo>();

  for (const row of Array.from(dom.querySelectorAll("tbody tr"))) {
    const sizeStr = (row.children[2] as HTMLElement).innerText.trim();
    const size =
      parseFloat(sizeStr) *
      (sizeStr.endsWith("GB")
        ? 2 ** 30
        : sizeStr.endsWith("MB")
          ? 2 ** 20
          : sizeStr.endsWith("kB")
            ? 2 ** 10
            : 1);

    const filename = row.children[0].querySelector("a")!.innerText;
    const id = row.id.match(/\d+$/g)![0];
    idmap.set(filename, {
      name: filename,
      id,
      size,
    });
  }

  return {
    info: idmap,
    fileCount: parseInt(
      (dom.querySelector("h1 + p") as HTMLElement).innerText.match(
        /\d+/g,
      )?.[0] ?? "0",
    ),
  };
}

export async function getAllFileInfo(pageId: string) {
  const firstPage = await getFileInfo(pageId);
  const pageCount = Math.ceil(firstPage.fileCount / 100);

  return {
    info: new Map(
      [
        firstPage,
        ...(await Promise.all(
          range(pageCount - 1).map(
            async (i) => await getFileInfo(pageId, i + 2),
          ),
        )),
      ].flatMap((p) => [...p.info.entries()]),
    ),
  };
}

export async function deleteFile(id: string) {
  await requestModuleAsync("Empty", {
    file_id: id,
    action: "FileAction",
    event: "deleteFile",
  });
}

export async function replaceFile(name: string, file: Blob, pageId: string) {
  const { ids } = await getFileIds(pageId);
  const id = ids.get(name);
  if (id) {
    await deleteFile(id);
  }
  await uploadFile(name, file, "", pageId);
}

export async function renameFile(id: string, newname: string) {
  return await requestModuleAsync("Empty", {
    file_id: id,
    new_name: newname,
    action: "FileAction",
    event: "renameFile",
  });
}

export function compareBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function getFileLink(filename: string) {
  return (
    window.location.origin +
    "/local--files/" +
    window.location.pathname.split("/")[1] +
    "/" +
    filename
  );
}
