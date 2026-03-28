import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CSS from "./search-ui.css?raw";
import { StringField } from "r628";

export function SearchUI(props: { threads: string[] }) {
  const [query, setQuery] = useState("");

  const splitQuery = query.split(" ");

  return (
    <div className="search-ui">
      <style>{CSS}</style>
      <div className="search-bar">
        <h2>Search 05command Threads</h2>
        <StringField value={query} setValue={setQuery}></StringField>
      </div>
      <ul className="search-results">
        {props.threads
          .filter((t) => splitQuery.some((q) => t.includes(q)))
          .map((t) => (
            <li key={t}>
              <a href={t} target="_blank">
                {URL.parse(t)?.pathname.split("/").at(-1) ?? t}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export function createSearchUI(props: Parameters<typeof SearchUI>[0]) {
  const elem = document.createElement("div");
  const root = createRoot(elem);
  root.render(<SearchUI {...props}></SearchUI>);
  return { elem, root };
}
