import React from "react";

export function reactWrap(elem: () => HTMLElement) {
  return () => {
    return (
      <div
        ref={(e) => {
          if (!e) return;
          e.appendChild(elem());
        }}
      ></div>
    );
  };
}
