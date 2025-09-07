import {
  alt_sc,
  apply,
  nil,
  opt_sc,
  Parser,
  ParseResult,
  ParserOutput,
  rep_n,
  rep_sc,
  Rule,
  rule,
  seq,
  str,
  Token,
} from "typescript-parsec";
import { any, notstr, rgx, TokenInfo, tokt } from "./tokenize.js";
import { tokenListToString } from "./parse-debug.js";

const BlockTagTypes = [
  "div",
  "ul",
  "ol",
  "li",
  "table",
  "row",
  "cell",
  "hcell",
  "collapsible",
  "tabview",
  "tab",
  "module",
  "gallery",
  "footnoteblock",
  ">",
  "=",
  "<",
  "eref",
] as const;

const InlineTagTypes = ["span", "a", "footnote", "size"] as const;

const TagTypes = [...BlockTagTypes, ...InlineTagTypes];

function strseq<T>(str: string): Parser<T, Token<T>[]> {
  return {
    parse(token): ParserOutput<T, Token<T>[]> {
      let testStr = "";
      let tokens = [];
      let firstToken = token;
      while (true) {
        if (testStr.length > str.length) {
          return {
            successful: false,
            error: {
              kind: "Error",
              pos: firstToken?.pos,
              message: `Failed to match token sequence with string '${str}'`,
            },
          };
        } else if (testStr === str) {
          return {
            successful: true,
            candidates: [{ firstToken, nextToken: token, result: tokens }],
            error: undefined,
          };
        } else if (token && str.startsWith(testStr)) {
          testStr += token.text;
          tokens.push(token);
          token = token.next;
        } else {
          return {
            successful: false,
            error: {
              kind: "Error",
              pos: firstToken?.pos,
              message: `Failed to match token sequence with string '${str}'`,
            },
          };
        }
      }
    },
  };
}

function isNotPrefixOf<T, U>(
  parser: Parser<T, U>,
  ensureNotPrefixOf: Parser<T, any>
): Parser<T, U> {
  return {
    parse(token): ParserOutput<T, U> {
      const result = parser.parse(token);
      if (!result.successful) return result;
      const notPrefixedByResult = ensureNotPrefixOf.parse(token);

      if (notPrefixedByResult.successful) {
        return {
          successful: false,
          error: {
            pos: token?.pos,
            kind: "Error",
            message: `Match is followed by disallowed sequence.`,
          },
        };
      }

      return result;
    },
  };
}

function refine<T, U>(
  parser: Parser<T, U>,
  fn: (u: U) => boolean
): Parser<T, U> {
  return {
    parse(token): ParserOutput<T, U> {
      const result = parser.parse(token);
      if (!result.successful) return result;
      return {
        ...result,
        candidates: result.candidates.filter((c) => fn(c.result)),
      };
    },
  };
}

type SelfClosingTagNames = "image";

export type ElementAttrib =
  | {
      type: "text";
      text: Token<TokenInfo>[];
    }
  | {
      type: "attrib";
      key: Token<TokenInfo>[];
      value: Token<TokenInfo>[];
    };

export type TextEffect =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "superscript"
  | "subscript"
  | "code";

export type AST =
  | {
      type: "branch";
      children: AST[];
      branchType:
        | {
            type: "element";
            tag: (typeof TagTypes)[number];
            attribs: ElementAttrib[];
            underscored: boolean;
          }
        | {
            type: "header";
            level: 1 | 2 | 3 | 4 | 5 | 6;
          }
        | {
            type: "text-effect";
            effect: TextEffect;
          }
        | {
            type: "color";
            color: string;
          }
        | {
            type: "list";
            isOrdered: boolean;
          }
        | {
            type: "list-item";
          }
        | {
            type: "table";
          };
    }
  | {
      type: "leaf";
      tokens: Token<TokenInfo>[];
      leafType:
        | {
            type:
              | "text"
              | "horizontal-line"
              | "inline-math"
              | "line-break"
              | "paragraph-break"
              | "escaped"
              | "escaped-html";
          }
        | {
            type: "element-with-no-children";
            attribs: ElementAttrib[];
            tag: SelfClosingTagNames;
          }
        | {
            type: "element";
            tag: "math" | "code";
            attribs: ElementAttrib[];
            underscored: boolean;
            content: Token<TokenInfo>[];
          };
    };

const text = apply(any(), (t): AST => {
  return {
    type: "leaf",
    tokens: [t],
    leafType: {
      type: "text",
    },
  };
});

const horizontalLine: Parser<TokenInfo, AST> = apply(
  seq(rep_n(str("-"), 5), rep_sc(str("-"))),
  ([a, b]): AST => {
    return {
      type: "leaf",
      tokens: [...a, ...b],
      leafType: { type: "horizontal-line" },
    };
  }
);

const delimitedLeaf = (
  startdelim: string,
  enddelim: string,
  leaftype: Exclude<
    (AST & { type: "leaf" })["leafType"]["type"],
    "element-with-no-children" | "element"
  >
): Parser<TokenInfo, AST> =>
  apply(
    seq(str(startdelim), rep_sc(notstr(enddelim)), str(enddelim)),
    ([a, b, c]): AST => {
      return {
        type: "leaf",
        tokens: [a, ...b, c],
        leafType: { type: leaftype },
      };
    }
  );

const textEffect = (
  startdelim: string,
  enddelim: string,
  effect: TextEffect,
  delimparser: (delim: string) => Parser<TokenInfo, any>
): Parser<TokenInfo, AST> =>
  apply(
    seq(
      delimparser(startdelim),
      isNotPrefixOf(nil(), ws),
      refine(
        rep_sc(
          alt_sc(astInlineOnly, isNotPrefixOf(text, delimparser(enddelim)))
        ),
        (r) => {
          const finalAST = r.at(-1);
          if (!finalAST) return true;
          return !(
            finalAST.type === "leaf" &&
            finalAST.leafType.type === "text" &&
            tokenListToString(finalAST.tokens).trim() === ""
          );
        }
      ),
      delimparser(enddelim)
    ),
    ([a, _, b, c]): AST => {
      return {
        type: "branch",
        children: b,
        branchType: {
          type: "text-effect",
          effect,
        },
      };
    }
  );

const inlineMath: Parser<TokenInfo, AST> = delimitedLeaf(
  "[[$",
  "$]]",
  "inline-math"
);

const escaped = delimitedLeaf("@@", "@@", "escaped");

const escapedHtml = delimitedLeaf("@<", ">@", "escaped-html");

const ws = seq(tokt("whitespace"), rep_sc(tokt("whitespace")));

const lineBreak: Parser<TokenInfo, AST> = apply(
  alt_sc(str("\n"), seq(ws, str("_"), str("\n"))),
  (t): AST => {
    return {
      type: "leaf",
      tokens: Array.isArray(t) ? t.flat(2) : [t],
      leafType: { type: "line-break" },
    };
  }
);

const paragraphBreak: Parser<TokenInfo, AST> = apply(
  seq(str("\n"), rep_sc(isNotPrefixOf(rgx(/\s/g), str("\n"))), str("\n")),
  (t): AST => {
    console.log("PARAGRAPH BREAK");
    return {
      type: "leaf",
      tokens: t.flat(),
      leafType: { type: "paragraph-break" },
    };
  }
);

const escapedStringNoQuotes = rep_sc(notstr('"'));

const namechar = rgx(/\w/g);

const name = rep_sc(namechar);

const optws = opt_sc(ws);

const attribute = seq(
  name,
  optws,
  str("="),
  optws,
  str('"'),
  escapedStringNoQuotes,
  str('"')
);

const elementName = nil();

export const astbase: Rule<TokenInfo, AST> = rule();
export const astInlineOnly: Rule<TokenInfo, AST> = rule();

const elementAttributeOrText = alt_sc(
  apply(attribute, (e) => {
    return {
      type: "attrib" as const,
      key: e[0],
      value: e[5] as Token<TokenInfo>[],
    };
  }),
  apply(notstr("]]"), (e) => {
    return {
      type: "text" as const,
      text: [e as Token<TokenInfo>],
    };
  })
);

const openingTag = (tagname: string) =>
  apply(
    seq(
      str("[["),
      strseq(tagname),
      opt_sc(str("_")),
      rep_sc(elementAttributeOrText),
      str("]]")
    ),
    (e) => ({
      underscore: !!e[2],
      attribs: e[3],
    })
  );

const closingTag = (tagname: string) =>
  apply(seq(str("[[/"), strseq(tagname), str("]]")), (e) => e);

const element = (
  tagname: (typeof TagTypes)[number],
  trimws: boolean
): Parser<TokenInfo, AST> =>
  apply(
    seq(
      openingTag(tagname),
      trimws ? optws : nil(),
      rep_sc(
        alt_sc(
          astbase,
          isNotPrefixOf(
            text,
            seq(trimws ? optws : nil(), strseq("[[/" + tagname + "]]"))
          )
        )
      ),
      trimws ? optws : nil(),
      closingTag(tagname)
    ),
    (e): AST => {
      return {
        type: "branch",
        children: e[2],
        branchType: {
          type: "element",
          tag: tagname,
          attribs: e[0].attribs,
          underscored: e[0].underscore,
        },
      };
    }
  ) as Parser<TokenInfo, AST>;

const elementlike = <T>(
  tagname: string,
  trimws: boolean,
  callback: (
    underscore: boolean,
    attribs: ElementAttrib[],
    content: Token<TokenInfo>[]
  ) => T
): Parser<TokenInfo, T> =>
  apply(
    seq(
      openingTag(tagname),
      rep_sc(isNotPrefixOf(any(), closingTag(tagname))),
      closingTag(tagname)
    ),
    ([a, b, c]) => callback(a.underscore, a.attribs, b)
  ) as Parser<TokenInfo, T>;

const elementNoClose = (tagname: SelfClosingTagNames): Parser<TokenInfo, AST> =>
  apply(openingTag(tagname), (t): AST => {
    return {
      type: "leaf",
      tokens: [],
      leafType: {
        type: "element-with-no-children",
        tag: tagname,
        attribs: t.attribs,
      },
    };
  }) as Parser<TokenInfo, AST>;

const textEffects = alt_sc(
  textEffect("**", "**", "bold", str),
  textEffect("--", "--", "strikethrough", strseq),
  textEffect("^^", "^^", "superscript", str),
  textEffect(",,", ",,", "subscript", str),
  textEffect("//", "//", "italic", str),
  textEffect("__", "__", "underline", str),
  textEffect("{{", "}}", "code", str)
);

const inlineElements = alt_sc(
  elementNoClose("image"),
  element("a", false),
  element("span", false),
  inlineMath
);

const escapeSequences = alt_sc(escaped, escapedHtml);

astInlineOnly.setPattern(
  alt_sc(inlineElements, textEffects, escapeSequences, lineBreak)
);

const elementlikeTokenlist = <Tag extends "math" | "code">(tag: Tag) =>
  elementlike(
    tag,
    true,
    (underscore, attribs, content): AST => ({
      type: "leaf",
      tokens: content,
      leafType: {
        type: "element",
        tag,
        attribs,
        underscored: underscore,
        content,
      },
    })
  );

astbase.setPattern(
  alt_sc(
    element("div", true),
    element("<", true),
    element("=", true),
    element(">", true),
    elementlikeTokenlist("math"),
    elementlikeTokenlist("code"),
    paragraphBreak,
    astInlineOnly,
    horizontalLine
  )
);

const ast = alt_sc(astbase, text);

// ast
//   .setPattern
//   ();

export const document = rep_sc(ast);
