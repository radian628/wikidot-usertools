import { interleave } from "r628";
import React, { Fragment, JSX } from "react";

export function HighlightSubstring(props: {
  children: string | undefined;
  highlight: RegExp | undefined;
}) {
  if (!props.highlight || !props.children) return props.children;

  const matches = [...props.children.matchAll(props.highlight)].map(
    (e) => e[0],
  );
  const splitStr = props.children.split(props.highlight);

  return (
    <>
      {splitStr.map((e, i) => (
        <Fragment key={i}>
          {e}
          {matches[i] ? (
            <span className="highlighted">{matches[i]}</span>
          ) : undefined}
        </Fragment>
      ))}
    </>
  );
}
