import { expect, test } from "bun:test";
import { tokenize } from "./tokenize.js";
import { document } from "./parse.js";
import { expectEOF, expectSingleResult } from "typescript-parsec";
import { parseDebug } from "./parse-debug.js";
import { parseSimple } from "./parse-test-utils.js";

parseSimple("asdasd");
parseSimple("-----");
parseSimple("test");
parseSimple("@@escaped@@ notscaped");
parseSimple("@@escaped@@");
parseSimple(`[[div]]
divtest
[[/div]]`);
parseSimple(`[[div class="blockquote"]]
divtest
[[/div]]`);
parseSimple(`[[image]]`);
parseSimple(`[[image test.png]]`);
parseSimple("**bold**");
parseSimple("**a**bold**b**");
parseSimple("**a**");
parseSimple("** a**");
parseSimple("**a **");
parseSimple("** a **");
parseSimple("//**__bolditalicunderline__**//");
parseSimple("**@@**@@**");
