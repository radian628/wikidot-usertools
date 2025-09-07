import {
  alt_sc,
  apply,
  buildLexer,
  expectEOF,
  expectSingleResult,
  opt_sc,
  Parser,
  ParserOutput,
  rep_sc,
  seq,
  str,
  Token,
} from "typescript-parsec";

// enum TokenKind {
//   Text,
//   Symbol,
// }

type BaseTokenInfo<AdditionalTypes> = (
  | {
      type: "text" | "symbol" | "whitespace";
    }
  | {
      type: "fail";
      why: string;
    }
  | AdditionalTypes
) & {
  sourceStack: { start: number; end: number; documentName: string }[];
};

export type TokenInfo = BaseTokenInfo<never>;

type TokenInfoWithPromise = BaseTokenInfo<{
  type: "pending";
  promise: Promise<Token<TokenInfo> | undefined>;
}>;

const SYMBOLS = [
  "[!--",
  "--]",
  "[[[",
  "]]]",
  "[[$",
  "$]]",
  "[[/",
  "[[",
  "]]",
  "[",
  "]",
  "{{",
  "}}",
  "//",
  "**",
  "__",
  "##",
  "@@",
  "@<",
  ">@",
  "^^",
  ",,",
  "|",
  "-",
  "_",
  '\\"',
];

function getLinesAndCols(input: string) {
  let lines: number[] = [];
  let cols: number[] = [];

  let line = 1;
  let col = 1;

  for (const c of input) {
    lines.push(line);
    cols.push(col);
    if (c === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }

  return { lines, cols };
}

function tokenizeRaw(input: string, documentName: string) {
  const { lines, cols } = getLinesAndCols(input);
  let currentToken: Token<TokenInfo> | undefined = undefined;
  let firstToken: Token<TokenInfo> | undefined = undefined;
  let pos = 0;

  function consume(count: number, type: "text" | "symbol" | "whitespace") {
    let start = pos;
    let end = pos + count;
    const tempToken = {
      kind: {
        type,
        sourceStack: [{ start, end, documentName }],
      },
      text: input.slice(0, count),
      pos: {
        rowBegin: lines[start],
        rowEnd: lines[end],
        columnBegin: cols[start],
        columnEnd: cols[end],
        index: start,
      },
      next: undefined,
    };
    // @ts-expect-error
    if (currentToken) currentToken.next = tempToken;
    currentToken = tempToken;
    if (!firstToken) firstToken = currentToken;
    pos += count;
    input = input.slice(count);
  }

  while (input.length > 0) {
    // match any special symbols that wikidot deems important
    let matched = false;
    for (const s of SYMBOLS) {
      if (input.startsWith(s)) {
        consume(s.length, "symbol");
        matched = true;
        break;
      }
    }
    if (matched) continue;

    if (input[0].match(/\s/g)) {
      consume(1, "whitespace");
      continue;
    }

    // otherwise, consume a single character of text
    consume(1, "text");
  }

  return firstToken;
}

export function tokt(
  t: TokenInfo["type"]
): Parser<TokenInfo, Token<TokenInfo>> {
  return {
    parse(token): ParserOutput<TokenInfo, Token<TokenInfo>> {
      if (token?.kind.type === t) {
        return {
          candidates: [
            { firstToken: token, nextToken: token.next, result: token },
          ],
          successful: true,
          error: undefined,
        };
      } else {
        return {
          successful: false,
          error: {
            kind: "Error",
            pos: token?.pos,
            message: `Failed to match token type '${t}'`,
          },
        };
      }
    },
  };
}

export function rgx<T>(regex: RegExp): Parser<TokenInfo, Token<TokenInfo>> {
  return {
    parse(token): ParserOutput<TokenInfo, Token<TokenInfo>> {
      if (token?.text.match(regex)) {
        return {
          candidates: [
            { firstToken: token, nextToken: token.next, result: token },
          ],
          successful: true,
          error: undefined,
        };
      } else {
        return {
          successful: false,
          error: {
            kind: "Error",
            pos: token?.pos,
            message: `Failed to match token regex '${regex.toString()}' (token was '${
              token?.text
            }')`,
          },
        };
      }
    },
  };
}

export function notstr<T>(str: string): Parser<T, Token<T>> {
  return {
    parse(token) {
      if (token && token.text !== str) {
        return {
          candidates: [
            { firstToken: token, nextToken: token.next, result: token },
          ],
          successful: true,
          error: undefined,
        };
      } else {
        return {
          successful: false,
          error: {
            kind: "Error",
            pos: token?.pos,
            message: `Expected anything other than the string '${str}' but got '${str}' nonetheless.`,
          },
        };
      }
    },
  };
}

export function any() {
  return rgx(/[\s\S]+/g);
}

function joinTokens(tokens: Token<any>[]): string {
  let str = "";
  for (const t of tokens) str += t.text;
  return str;
}

function expandIncludeStatements(
  tokens: Token<TokenInfo> | undefined,
  expandInclude: (
    slug: string,
    params: Map<string, string>,
    depth: number
  ) => Promise<Token<TokenInfo> | undefined>,
  documentName: string,
  depthRemaining: number
) {
  const escapeSequence: Parser<TokenInfo, Token<TokenInfoWithPromise>[]> =
    apply(
      alt_sc(
        seq(str("@@"), rep_sc(notstr("@@")), str("@@")),
        seq(str("@<"), rep_sc(notstr(">@")), str(">@"))
      ),
      (e) => {
        return [e[0], ...e[1], e[2]];
      }
    );

  const kvpSeparator = seq(str("|"), rep_sc(str("|")));

  const keyValuePair = apply(
    seq(
      rep_sc(rgx(/\w/g)),
      rep_sc(tokt("whitespace")),
      str("="),
      rep_sc(notstr("|"))
    ),
    (e) => {
      const key = joinTokens(e[0]);
      const value = joinTokens(e[3]);
      return [key, value] as const;
    }
  );

  const includeStmt = apply(
    seq(
      str("[["),
      str("i"),
      str("n"),
      str("c"),
      str("l"),
      str("u"),
      str("d"),
      str("e"),
      rep_sc(tokt("whitespace")),
      rep_sc(rgx(/[^\s]/g)),
      rep_sc(tokt("whitespace")),
      opt_sc(kvpSeparator),
      rep_sc(seq(keyValuePair, kvpSeparator)),
      opt_sc(keyValuePair),
      rep_sc(tokt("whitespace")),
      str("]]")
    ),
    (e): Token<TokenInfoWithPromise>[] => {
      const kvps = e[12].map((e) => e[0]).concat(e[13] ? e[13] : []);
      const paramsMap = new Map(kvps);
      const slug = joinTokens(e[9]);
      const expandedInclude = expandInclude(
        slug,
        paramsMap,
        depthRemaining - 1
      );

      return [
        {
          next: undefined,
          kind: {
            type: "pending",
            promise: expandedInclude,
            sourceStack: [
              { start: e[0].pos.index, end: e[15].pos.index + 2, documentName },
            ],
          },
          pos: e[0].pos,
          text: "",
        },
      ];
    }
  );

  const document = apply(
    rep_sc(
      alt_sc(
        escapeSequence,
        includeStmt,
        apply(alt_sc(tokt("text"), tokt("whitespace"), tokt("symbol")), (e) => [
          e,
        ])
      )
    ),
    (arr) => {
      const arrflat = arr.flat(1);

      return tokenArrayToList(arrflat);
    }
  );

  return expectSingleResult(expectEOF(document.parse(tokens)));
}

function tokenArrayToList<T>(arr: Token<T>[]): Token<T> | undefined {
  let outTokens: Token<T> | undefined = undefined;
  let lastToken: Token<T> | undefined = undefined;
  if (arr.length > 0) {
    outTokens = { ...arr[0] };
    lastToken = outTokens;
  }
  for (const t of arr.slice(1)) {
    const tokenTemp = lastToken;
    lastToken = { ...t };
    // @ts-expect-error
    tokenTemp!.next = lastToken;
  }

  return outTokens;
}

function tokenListToArray<T>(tokens: Token<T> | undefined): Token<T>[] {
  const arr: Token<T>[] = [];
  while (tokens) {
    arr.push({ ...tokens, next: undefined });
    tokens = tokens.next;
  }
  return arr;
}

async function waitForIncludeStatements(
  tokens: Token<TokenInfoWithPromise> | undefined
): Promise<Token<TokenInfo> | undefined> {
  const array = tokenListToArray(tokens);
  const outArray = (
    await Promise.all(
      array.map(async (e): Promise<Token<TokenInfo>[]> => {
        if (e.kind.type === "pending") {
          const res = await e.kind.promise;
          return tokenListToArray(res).map((t) => ({
            ...t,
            kind: {
              ...t.kind,
              sourceStack: [...t.kind.sourceStack, ...e.kind.sourceStack],
            },
          }));
        } else {
          return [e as Token<TokenInfo>];
        }
      })
    )
  ).flat(1);
  return tokenArrayToList(outArray);
}

export async function tokenize(
  str: string,
  documentName: string,
  expandInclude: (
    slug: string,
    params: Map<string, string>,
    depth: number
  ) => Promise<Token<TokenInfo> | undefined>,
  depthRemaining: number
): Promise<Token<TokenInfo> | undefined> {
  const tokens = tokenizeRaw(str, documentName);
  const expandedIncludes = expandIncludeStatements(
    tokens,
    expandInclude,
    documentName,
    depthRemaining
  );
  return await waitForIncludeStatements(tokens);
}
