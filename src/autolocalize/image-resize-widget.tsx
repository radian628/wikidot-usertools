import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import WIDGET_CSS from "./image-resize-widget.css?raw";

export function Slider(props: {
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <input
      type="range"
      value={props.value}
      onChange={(e) => {
        props.setValue(Number(e.currentTarget.value));
      }}
      min={props.min}
      max={props.max}
      step={props.step}
    />
  );
}

export function EnumField<T>(props: {
  variants: [T, string][];
  value: T;
  setValue: (t: T) => void;
}) {
  return (
    <div className="enum-ui">
      {props.variants.map((v) => (
        <button
          className={props.value === v[0] ? "selected" : ""}
          onClick={() => {
            props.setValue(v[0]);
          }}
        >
          {v[1]}
        </button>
      ))}
    </div>
  );
}

export async function getResized(
  img: ImageBitmap,
  width: number,
  height: number,
  quality: number,
  format: "webp" | "png" | "jpg",
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      {
        webp: "image/webp",
        png: "image/png",
        jpg: "image/jpeg",
      }[format],
      quality,
    );
  });
}

export function ImageResizeWidget(props: {
  image: ImageBitmap;
  originalSize?: number;
  onUseImage: (image: Blob) => void;
}) {
  const [format, setFormat] = useState<"webp" | "png" | "jpg">("webp");
  const [resolutionFactor, setResolutionFactor] = useState(
    600 / props.image.width,
  );
  const [quality, setQuality] = useState(0.9);

  const [resultSize, setResultSize] = useState(0);

  const [outputImage, setOutputImage] = useState<{
    blob: Blob;
    objectUrl: string;
  } | null>(null);

  const width = Math.round(props.image.width * resolutionFactor);
  const height = Math.round(props.image.height * resolutionFactor);

  useEffect(() => {
    (async () => {
      const blob = await getResized(
        props.image,
        width,
        height,
        quality,
        format,
      );

      if (outputImage) {
        URL.revokeObjectURL(outputImage.objectUrl);
      }

      setOutputImage(
        blob
          ? {
              blob,
              objectUrl: URL.createObjectURL(blob),
            }
          : null,
      );
    })();
  }, [props.image, resolutionFactor, quality, format]);

  return (
    <div className="image-resize-widget">
      <style>{WIDGET_CSS}</style>
      <div style={{ gridArea: "top" }}>
        <p>
          This image is too big! Tech policy disallows images above 800kB
          without permission from staff. Use this tool to downscale it:
        </p>
      </div>
      <div>
        <div style={{ gridArea: "settings" }}>
          <EnumField
            value={format}
            setValue={setFormat}
            variants={[
              ["webp", "WEBP"],
              ["jpg", "JPEG"],
              ["png", "PNG"],
            ]}
          ></EnumField>
          <div className="sliders-container">
            <label>Resolution</label>
            <Slider
              value={resolutionFactor}
              setValue={setResolutionFactor}
              min={0.03}
              max={1}
              step={0.001}
            ></Slider>
            {format !== "png" && (
              <>
                <label>Quality</label>
                <Slider
                  value={quality}
                  setValue={setQuality}
                  min={0.0}
                  max={1}
                  step={0.001}
                ></Slider>
              </>
            )}
          </div>
        </div>
      </div>
      {outputImage && (
        <>
          <div style={{ gridArea: "info" }}>
            <div>
              Size: {Math.ceil(outputImage.blob.size / 1000)}kB (
              {props.originalSize &&
                (
                  (outputImage.blob.size / props.originalSize) *
                  100
                ).toPrecision(3)}
              % of original)
            </div>
            <div>
              Resolution: {width}x{height} pixels
            </div>
          </div>
          <div className="image-container">
            <img style={{ maxWidth: "unset" }} src={outputImage?.objectUrl} />
          </div>
          <div style={{ gridArea: "actions" }}>
            <button
              className="use-image-button"
              onClick={() => {
                props.onUseImage(outputImage.blob);
              }}
            >
              Use Image
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export async function imageResizePopup(image: Blob) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  const reactRoot = createRoot(root);

  const bmp = await createImageBitmap(image);

  return new Promise<Blob>((resolve, reject) => {
    reactRoot.render(
      <ImageResizeWidget
        image={bmp}
        originalSize={image.size}
        onUseImage={(newImage) => {
          reactRoot.unmount();
          root.parentElement?.removeChild(root);
          resolve(newImage);
        }}
      ></ImageResizeWidget>,
    );
  });
}
