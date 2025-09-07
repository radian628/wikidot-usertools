import { tokenListToString } from "./parse-debug.js";
import { AST, ElementAttrib, TextEffect } from "./parse.js";

function getTextEffectElement(effect: TextEffect) {
  const elemTag = {
    bold: "strong",
    subscript: "sub",
    superscript: "sup",
    italic: "em",
    underline: "span",
    strikethrough: "span",
    code: "tt",
  }[effect];

  const textDeco = {
    bold: undefined,
    subscript: undefined,
    superscript: undefined,
    italic: undefined,
    underline: "underline",
    strikethrough: "line-through",
    code: undefined,
  }[effect];

  const elem = document.createElement(elemTag);
  if (textDeco) elem.style.textDecoration = textDeco;
  return elem;
}

function isEmpty(ast: AST) {
  return (
    ast.type === "leaf" &&
    ast.leafType.type === "text" &&
    tokenListToString(ast.tokens).trim() === ""
  );
}

function isAllEmpty(doc: AST[]) {
  return doc.every((e) => isEmpty(e));
}

function breaksParagraph(ast: AST): boolean {
  if (ast.type === "branch") {
    if (ast.branchType.type === "element")
      return (
        {
          a: false,
          footnote: false,
          size: false,
          span: false,

          div: true,
          ul: true,
          ol: true,
          li: true,
          table: true,
          row: true,
          cell: true,
          hcell: true,
          collapsible: true,
          tabview: true,
          tab: true,
          module: true,
          gallery: true,
          footnoteblock: true,
          ">": true,
          "<": true,
          "=": true,
          eref: true,
        } as const
      )[ast.branchType.tag];

    return (
      {
        header: true,
        "text-effect": false,
        color: false,
        list: true,
        "list-item": true,
        table: true,
      } as const
    )[ast.branchType.type];
  } else {
    if (ast.leafType.type === "element-with-no-children") return true;
    if (ast.leafType.type === "element") return true;

    return (
      {
        text: false,
        "horizontal-line": true,
        "inline-math": false,
        "line-break": false,
        "paragraph-break": true,
        escaped: false,
        "escaped-html": false,
      } as const
    )[ast.leafType.type];
  }
}

type CodegenContext = {
  equationCounter: number;
};

export function codegenBlock(
  asts: AST[],
  root: HTMLElement,
  underscored: boolean,
  ctx: CodegenContext
) {
  let currentParagraphChildren: AST[] = [];
  let paragraphs: { children: AST[]; needsP: boolean }[] = [];

  for (const child of asts) {
    if (breaksParagraph(child)) {
      paragraphs.push({
        needsP: true,
        children: currentParagraphChildren,
      });
      paragraphs.push({
        needsP: false,
        children: [child],
      });
      currentParagraphChildren = [];
    } else {
      currentParagraphChildren.push(child);
    }
  }
  paragraphs.push({
    needsP: true,
    children: currentParagraphChildren,
  });

  paragraphs = paragraphs.filter((p) => p.children.length > 0);

  for (const praw of paragraphs) {
    const p = praw.children.concat();

    // get rid of leading and trailing line breaks
    if (p[0].type === "leaf" && p[0].leafType.type === "line-break") {
      p.splice(0, 1);
    }
    const last = p.at(-1);
    if (last?.type === "leaf" && last.leafType.type === "line-break") {
      p.pop();
    }

    const compiled = p.map((p) => codegen(p, ctx)).flat(1);
    if (compiled.length === 0) continue;
    if (
      (underscored &&
        (praw === paragraphs.at(0) || praw === paragraphs.at(-1))) ||
      !praw.needsP
    ) {
      for (const e of compiled) root.appendChild(e);
    } else {
      // no empty paragraphs
      if (isAllEmpty(p)) {
        continue;
      }
      const paragraph = document.createElement("p");
      root.appendChild(paragraph);
      for (const e of compiled) paragraph.appendChild(e);
    }
  }
}

export function codegen(ast: AST, ctx: CodegenContext): Node[] {
  if (ast.type === "leaf") {
    // regular, raw text
    if (ast.leafType.type === "text") {
      const node = new Text();
      node.textContent = tokenListToString(ast.tokens);
      return [node];
    } else if (ast.leafType.type === "paragraph-break") {
      // paragraph breaks are handled by their enclosing container
      return [];
    } else if (ast.leafType.type === "line-break") {
      const br = document.createElement("br");
      return [br];
    } else if (ast.leafType.type === "horizontal-line") {
      const hr = document.createElement("hr");
      return [hr];
    } else if (ast.leafType.type === "inline-math") {
      const span = document.createElement("span");
      span.className = "math-inline";
      span.innerText =
        "$" + tokenListToString(ast.tokens.slice(1, -1)).trim() + "$";
      return [span];
    } else if (ast.leafType.type === "element") {
      if (ast.leafType.tag === "math") {
        const equationNumber = document.createElement("span");
        const eqnum = ctx.equationCounter++;
        equationNumber.innerText = "(" + eqnum + ")";
        equationNumber.className = "equation-number";

        const equation = document.createElement("div");
        equation.className = "math-equation";
        equation.id = "equation-" + eqnum;
        equation.innerText = `\\begin{align} ${tokenListToString(
          ast.leafType.content
        ).trim()} \\end{align}`;
        return [equationNumber, equation];
      } else {
        const container1 = document.createElement("div");
        container1.className = "code";

        const container2 = document.createElement("pre");
        container1.appendChild(container2);

        const container3 = document.createElement("code");
        container2.appendChild(container3);

        container3.innerText = tokenListToString(ast.leafType.content);
        return [container1];
      }
    } else {
      throw new Error("not implemented");
    }
  } else {
    // html elements
    if (ast.branchType.type === "element") {
      //div
      if (ast.branchType.tag === "div") {
        const element = document.createElement("div");
        applyAttribsToElement(element, ast.branchType.attribs);
        codegenBlock(ast.children, element, ast.branchType.underscored, ctx);
        return [element];
      } else if (
        ast.branchType.tag === ">" ||
        ast.branchType.tag === "=" ||
        ast.branchType.tag === "<"
      ) {
        // TODO: properly handle underscores and attributes (these elements dont support either)
        const align = {
          "<": "left",
          "=": "center",
          ">": "right",
        }[ast.branchType.tag];
        const element = document.createElement("div");
        element.style.textAlign = align;
        codegenBlock(ast.children, element, ast.branchType.underscored, ctx);
        return [element];
      } else if (ast.branchType.tag === "span" || ast.branchType.tag === "a") {
        const element = document.createElement(ast.branchType.tag);
        applyAttribsToElement(element, ast.branchType.attribs);
        for (const child of ast.children) {
          for (const e of codegen(child, ctx)) {
            element.appendChild(e);
          }
        }
        return [element];
      }
    }

    // text effects
    const children = ast.children.map((c) => codegen(c, ctx)).flat(1);
    if (ast.branchType.type === "text-effect") {
      const element = getTextEffectElement(ast.branchType.effect);
      for (const c of children) element.appendChild(c);
      return [element];
    } else {
      throw new Error("not implemented");
    }
  }
}

function applyAttribsToElement(e: HTMLElement, attribs: ElementAttrib[]) {
  let isValidKvp = true;
  for (const attr of attribs) {
    if (
      attr.type === "text" &&
      tokenListToString(attr.text).trim().length > 0
    ) {
      isValidKvp = false;
    }

    if (attr.type === "attrib") {
      if (isValidKvp) {
        e.setAttribute(
          tokenListToString(attr.key),
          tokenListToString(attr.value)
        );
      }
      isValidKvp = true;
    }
  }
}
