import React, { useEffect, useRef, useState } from "react";
import { requestModuleAsync } from "../common/request-module-async.js";
import {
  deleteFile,
  getFileInfo,
  renameFile,
  uploadFile,
} from "../common/file-io.js";

function fileSizePreview(size: number) {
  if (size > 2 ** 30) {
    return (size / 2 ** 30).toFixed(2) + " GB";
  }

  if (size > 2 ** 20) {
    return (size / 2 ** 20).toFixed(2) + " MB";
  }

  if (size > 2 ** 10) {
    return (size / 2 ** 10).toFixed(2) + " kB";
  }

  return size + " bytes";
}

function FilePreview(props: { file: Blob }) {
  const [url, setURL] = useState<string>();

  useEffect(() => {
    if (!url) setURL(URL.createObjectURL(props.file));

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [props.file]);

  if (props.file.type.startsWith("image")) {
    if (url) return <img className="multisave-image-preview" src={url}></img>;
    return <div>Loading...</div>;
  }
  return <div>N/A</div>;
}

function SingleFileTableRow(props: {
  file: FileInfo;
  delete: () => void;
  rename: (name: string) => void;
  uploaded: boolean;
}) {
  const name = props.file.nameChange?.oldName ?? props.file.name;

  const lowercase = name.toLowerCase();

  const isImage = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"].some(
    (e) => lowercase.endsWith(e)
  );

  return (
    <tr
      className={
        props.uploaded ? "multisave-uploaded-file" : "multisave-local-file"
      }
    >
      <td>
        <input
          type="text"
          value={props.file.name}
          onInput={(e) => {
            props.rename(e.currentTarget.value);
          }}
        ></input>
      </td>
      <td title={props.file.size + " bytes"}>
        {fileSizePreview(props.file.size)}
      </td>
      <td>
        {props.file.file ? (
          <FilePreview file={props.file.file}></FilePreview>
        ) : (
          <a
            href={`/local--files/${WIKIREQUEST.info.requestPageName}/${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isImage ? (
              <img
                src={`/local--files/${WIKIREQUEST.info.requestPageName}/${name}`}
                className="multisave-image-preview"
              ></img>
            ) : (
              "Link"
            )}
          </a>
        )}
      </td>
      <td>{props.uploaded ? "✔" : ""}</td>
      <td>
        <button onClick={props.delete}>🗙</button>
      </td>
    </tr>
  );
}

type FileInfo = {
  name: string;
  size: number;
  file?: Blob;
  key: number;
  uploadedFileId?: string;
  nameChange?: {
    oldName: string;
  };
};

type ProgressBarProps = {
  currentBytes: number;
  totalBytes: number;
  currentFilesTransferred: number;
  totalFilesTransferred: number;
  currentFilesRenamed: number;
  totalFilesRenamed: number;
};

export function MultisaveProgressBar(props: ProgressBarProps) {
  return (
    <div className="multisave-progress-bar-container">
      <div className="multisave-progress-header">Progress:</div>
      {props.totalFilesTransferred > 0 ? (
        <>
          <div className="multisave-progress-bar">
            <div
              className="multisave-progress"
              style={{
                width: `${(props.currentBytes / props.totalBytes) * 100}%`,
              }}
            ></div>
          </div>
          <div>
            Data Transferred: {fileSizePreview(props.currentBytes)} /{" "}
            {fileSizePreview(props.totalBytes)}
          </div>
          <div>
            Files Transferred: {props.currentFilesTransferred} /{" "}
            {props.totalFilesTransferred}
          </div>
        </>
      ) : (
        <></>
      )}
      {props.totalFilesRenamed > 0 ? (
        <div>
          Files Renamed: {props.currentFilesRenamed} / {props.totalFilesRenamed}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export function MultisaveDialog(props: { exit: () => void }) {
  const [stagedFiles, setStagedFiles] = useState<FileInfo[]>([]);

  const [hasFetchedUploads, setHasFetchedUploads] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [uploadProgress, setUploadProgress] = useState<
    ProgressBarProps | undefined
  >();

  useEffect(() => {
    if (hasFetchedUploads) return;

    (async () => {
      const fileInfo = await getFileInfo(window.WIKIREQUEST.info.pageId);

      const uploadedFiles: FileInfo[] = [...fileInfo.info.values()].map(
        (f) => ({
          key: currentFileKey.current++,
          name: f.name,
          size: f.size,
          uploadedFileId: f.id,
        })
      );

      setHasFetchedUploads(true);
      setIsLoading(false);
      setStagedFiles([...stagedFiles, ...uploadedFiles]);
    })();
  }, [hasFetchedUploads]);

  const currentFileKey = useRef(0);
  return (
    <>
      {uploadProgress && (
        <MultisaveProgressBar {...uploadProgress}></MultisaveProgressBar>
      )}
      <div className="multisave-dialog">
        <div className="multisave-header">
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              const stagedFilesCopy = [...stagedFiles];
              for (const file of Array.from(files)) {
                stagedFilesCopy.push({
                  file,
                  name: file.name,
                  size: file.size,
                  key: currentFileKey.current++,
                });
              }
              setStagedFiles(stagedFilesCopy);
              e.target.files = null;
            }}
          ></input>
          <button
            onClick={async () => {
              const promises: Promise<any>[] = [];

              let totalFilesTransferred = 0;
              let totalFilesRenamed = 0;
              let totalBytes = 0;

              let currentFilesTransferred = 0;
              let currentFilesRenamed = 0;
              let currentBytes = 0;

              function updateUploadProgress() {
                setUploadProgress({
                  totalFilesRenamed,
                  totalFilesTransferred,
                  totalBytes,
                  currentBytes,
                  currentFilesRenamed,
                  currentFilesTransferred,
                });
              }

              for (const file of stagedFiles) {
                if (file.nameChange && file.uploadedFileId) {
                  promises.push(
                    renameFile(file.uploadedFileId, file.name).then((e) => {
                      currentFilesRenamed++;
                      updateUploadProgress();
                    })
                  );
                  totalFilesRenamed++;
                } else if (!file.uploadedFileId && file.file) {
                  promises.push(
                    uploadFile(
                      file.name,
                      file.file,
                      "",
                      WIKIREQUEST.info.pageId
                    ).then((e) => {
                      currentFilesTransferred++;
                      updateUploadProgress();
                      currentBytes += file.size;
                    })
                  );
                  totalFilesTransferred++;
                  totalBytes += file.size;
                }
              }

              setIsLoading(true);
              updateUploadProgress();

              await Promise.all(promises);

              setIsLoading(false);
              setUploadProgress(undefined);

              setStagedFiles([]);
              setHasFetchedUploads(false);
            }}
          >
            Save All
          </button>
          <button
            onClick={() => {
              // delete all uploaded files (so we can then refetch them)
              setStagedFiles(
                stagedFiles.filter((f) => f.uploadedFileId === undefined)
              );

              // refetch files
              setHasFetchedUploads(false);
            }}
          >
            Refresh
          </button>
          <button onClick={props.exit}>Exit</button>
        </div>
        <div className="multisave-dialog-scroll">
          {isLoading ? (
            <div className="multisave-loading-div">Loading...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Preview</th>
                  <th>Saved?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stagedFiles.map((f, i) => (
                  <SingleFileTableRow
                    key={f.key}
                    file={f}
                    uploaded={f.uploadedFileId !== undefined && !f.nameChange}
                    rename={(name) => {
                      const newFile: FileInfo = { ...f, name };
                      if (!newFile.nameChange) {
                        newFile.nameChange = { oldName: f.name };
                      }
                      setStagedFiles(
                        stagedFiles.map((f2, j) => (i === j ? newFile : f2))
                      );
                    }}
                    delete={async () => {
                      // if it's uploaded...
                      if (f.uploadedFileId) {
                        console.log("staged files!", stagedFiles);
                        // remove the file from the list
                        // so that there's instant feedback
                        setStagedFiles(stagedFiles.filter((f2, j) => i !== j));

                        // delete the file from remote
                        await deleteFile(f.uploadedFileId);

                        // delete all uploaded files (so we can then refetch them)
                        setStagedFiles(
                          stagedFiles.filter(
                            (f) => f.uploadedFileId === undefined
                          )
                        );

                        // refetch files
                        setHasFetchedUploads(false);
                      }
                    }}
                  ></SingleFileTableRow>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
