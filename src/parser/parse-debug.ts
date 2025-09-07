import { Token } from "typescript-parsec";
import { AST } from "./parse.js";

type Sexpr = string | Sexpr[];

export function maxLineLength(str: string) {
  return str.split("\n").reduce((prev, curr) => Math.max(prev, curr.length), 0);
}

export function formatSexpr(sexpr: Sexpr): string {
  if (typeof sexpr === "string") {
    return sexpr;
  } else {
    const children = sexpr.map((s) => formatSexpr(s));
    const inlineAttempt = `(${children.join(" ")})`;
    if (maxLineLength(inlineAttempt) > 50) {
      return `(${children.map((c) => c.replace(/\n/g, "\n  ")).join("\n  ")})`;
    }
    return inlineAttempt;
  }
}

export function tokenListToString<T>(ts: Token<T>[]) {
  let str = "";
  for (const t of ts) {
    str += t.text;
  }
  return str;
}

function tokenListToQuotedString<T>(ts: Token<T>[]) {
  return JSON.stringify(tokenListToString(ts));
}

export function astToSexpr(ast: AST): Sexpr {
  if (ast.type === "leaf") {
    if (ast.leafType.type === "element-with-no-children") {
      return [
        ast.leafType.tag,
        ast.leafType.attribs.map((attr) =>
          attr.type === "attrib"
            ? [
                "attrib",
                tokenListToQuotedString(attr.key),
                tokenListToQuotedString(attr.value),
              ]
            : ["text", tokenListToQuotedString(attr.text)]
        ),
      ];
    }
    return [
      ast.leafType.type,
      ...ast.tokens.map((t) => JSON.stringify(t.text)),
    ];
  } else {
    const parsedChildren = ast.children.map((c) => astToSexpr(c));
    if (ast.branchType.type === "element") {
      return [
        ast.branchType.tag,
        ast.branchType.attribs.map((attr) =>
          attr.type === "attrib"
            ? [
                "attrib",
                tokenListToQuotedString(attr.key),
                tokenListToQuotedString(attr.value),
              ]
            : ["text", tokenListToQuotedString(attr.text)]
        ),
        ...parsedChildren,
      ];
    } else if (ast.branchType.type === "text-effect") {
      return [ast.branchType.effect, ...parsedChildren];
    }
    return [ast.branchType.type, ...parsedChildren];
  }
}

export function parseDebug(ast: AST): string {
  // if (ast.type === "leaf") {
  //   return `(${ast.leafType.type} ${ast.tokens.map((t) => t.text).join(" ")})`;
  // } else {
  //   const children = ast.children.map((c) => parseDebug(c));
  //   const str = `(${ast.branchType.type} ${children.join(" ")})`;
  //   if (str.length > 60) {
  //     return `(${ast.branchType.type}${children
  //       .map((e) => `  ${e.replace(/\n/g, "  \n")}`)
  //       .join("\n")})`;
  //   } else {
  //     return str;
  //   }
  // }
  return formatSexpr(astToSexpr(ast));
}
