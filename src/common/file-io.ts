import { requestModuleAsync } from "./request-module-async.js";

export function uploadFile(name: string, file: Blob, comments: string) {
  const formdata = new FormData();
  formdata.append("action", "FileAction");
  formdata.append("event", "uploadFile");
  formdata.append("page_id", WIKIREQUEST.info.pageId);
  formdata.append("MAX_FILE_SIZE", "209715200");
  formdata.append("userfile", file);
  formdata.append("dfilename", name);
  formdata.append("comments", comments);
  return fetch(window.location.origin + "/default--flow/files__UploadTarget", {
    method: "post",
    body: formdata,
  });
}

export async function getFileIds() {
  const table = await requestModuleAsync("files/PageFilesModule", {
    page_id: WIKIREQUEST.info.pageId,
  });
  const dom = new DOMParser().parseFromString(table.body, "text/html");

  let idmap = new Map();

  for (const row of Array.from(dom.querySelectorAll("tbody tr"))) {
    const filename = row.children[0].querySelector("a")!.innerText;
    const id = row.id.match(/\d+$/g)![0];
    idmap.set(filename, id);
  }

  return { ids: idmap };
}

export type FileInfo = {
  size: number;
  id: string;
  name: string;
};

export async function getFileInfo() {
  const table = await requestModuleAsync("files/PageFilesModule", {
    page_id: WIKIREQUEST.info.pageId,
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

  return { info: idmap };
}

export async function deleteFile(id: string) {
  await requestModuleAsync("Empty", {
    file_id: id,
    action: "FileAction",
    event: "deleteFile",
  });
}

export async function replaceFile(name: string, file: Blob) {
  const { ids } = await getFileIds();
  const id = ids.get(name);
  if (id) {
    await deleteFile(id);
  }
  await uploadFile(name, file, "");
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
