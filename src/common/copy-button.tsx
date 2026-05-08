import { useGetSet } from "r628";
import React, { useEffect } from "react";

type CopyButtonProps = {
  text: string;
  buttonText?: string;
  successText?: string;
  failText?: string;
};

export function CopyButton(
  props: {
    copy: (s: string) => Promise<void>;
  } & CopyButtonProps,
) {
  const buttonText = useGetSet(props.buttonText ?? "Click to Copy");

  return (
    <button
      onClick={() => {
        props
          .copy(props.text)
          .catch(() => {
            buttonText.setValue(() => props.failText ?? "Failed to copy!");
          })
          .then(() => {
            buttonText.setValue(
              () => props.successText ?? "Copied to clipboard!",
            );
          });

        setTimeout(() => {
          buttonText.setValue(() => props.buttonText ?? "Click to Copy");
        }, 2000);
      }}
    >
      {buttonText.value}
    </button>
  );
}

export function GMCopyButton(props: CopyButtonProps) {
  return <CopyButton {...props} copy={(s) => GM.setClipboard(s)}></CopyButton>;
}
