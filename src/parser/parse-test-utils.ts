import { test, expect } from "bun:test";
import { tokenize } from "./tokenize.js";
import { expectSingleResult } from "typescript-parsec";
import { parseDebug } from "./parse-debug.js";
import { document as wikitextDoc } from "./parse.js";
import { codegen, codegenBlock } from "./codegen.js";

export async function parseSimple(str: string) {
  test(str, async () => {
    const tokenized = await tokenize(
      str,
      "main",
      (slug, params, depth) => {
        throw new Error("unimplemented");
      },
      10
    );

    const doc = expectSingleResult(wikitextDoc.parse(tokenized));

    for (const ast of doc) console.log(parseDebug(ast));
  });
}

export async function codegenSimple(str: string) {
  test("", async () => {
    const tokenized = await tokenize(
      str,
      "main",
      (slug, params, depth) => {
        throw new Error("unimplemented");
      },
      10
    );

    const doc = expectSingleResult(wikitextDoc.parse(tokenized));

    const dom = document.createElement("div");
    codegenBlock(doc, dom, false, { equationCounter: 1 });
    console.log("input: ", str);
    console.log("output: ", dom.outerHTML);
    console.log("\n");
  });
}
