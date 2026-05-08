import React, { PropsWithChildren, useRef, useState } from "react";
import { useEffect } from "react";
import { asyncRequestModule } from "../common/wikidot-api-utils.js";
import { str2html } from "r628";
import { createPortal } from "react-dom";
import { useAsyncState } from "../common/async-state-hook.js";

export function RawDom(props: { dom?: Element | null; className?: string }) {
  const elemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!props.dom || !elemRef.current) return;
    elemRef.current.appendChild(props.dom);

    return () => {
      if (!elemRef.current || !props.dom) return;
      elemRef.current.removeChild(props.dom);
    };
  }, [props.dom]);

  return <div className={props.className} ref={elemRef}></div>;
}

export function WikidotModuleContent(props: {
  moduleName: string;
  params: any;
  deps: any[];
  className?: string;
  mutate?: (dom: Document) => void;
  onLoad?: () => void;
}) {
  const elemRef = useRef<HTMLDivElement | null>(null);

  const { value: dom, setValue: setDom } = useAsyncState(async () => {
    const res = await asyncRequestModule(props.moduleName, props.params);
    if (res.status !== "ok") return;
    const html = str2html("<div>" + res.body + "</div>");
    props.mutate?.(html);
    setTimeout(() => {
      props.onLoad?.();
    });
    return html.body;
  }, props.deps);

  useEffect(() => {
    if (!dom || !elemRef.current) return;
    for (const child of dom.children) {
      elemRef.current.appendChild(child);
    }
    return () => {
      if (!elemRef.current) return;
      for (const child of elemRef.current.children) {
        elemRef.current.removeChild(child);
      }
    };
  }, [dom]);

  return <div className={props.className} ref={elemRef}></div>;
}

export function ShadowRooted(props: PropsWithChildren) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [sr, setSr] = useState<ShadowRoot>();

  useEffect(() => {
    if (!rootRef.current) return;
    if (!rootRef.current.parentElement) return;
    const shadowRoot = rootRef.current.parentElement.attachShadow({
      mode: "open",
    });
    setSr(shadowRoot);
  }, []);

  return <div ref={rootRef}>{sr && createPortal(props.children, sr)}</div>;
}
