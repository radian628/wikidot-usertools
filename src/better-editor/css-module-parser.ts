import { parseMixed } from "@lezer/common";
import { buildParser } from "@lezer/generator";
import * as jsParser from "@lezer/javascript";

export const cssModuleParser = buildParser(`
        @top Program {
          (JSComment | CSSModule | HTMLBlock | Anything)+
        }
        
        CSSModule {
          CSSModuleStart CSSModuleContent CSSModuleEnd
        }

        HTMLBlock {
          HTMLBlockStart1 Any* HTMLBlockStart2 HTMLBlockContent HTMLBlockEnd
        }

        JSComment {
          JSCommentStart JSCommentContent JSCommentEnd 
        }

        JSCommentContent {
          (
            Any
            | CSSModuleStart
            | CSSModuleEnd
            | HTMLBlockStart1
            | HTMLBlockStart2
            | HTMLBlockEnd
            | JSCommentStart
          )+ 
        }

        CSSModuleContent { 
          Anything+
        }

        HTMLBlockContent { 
          Anything+
        }
        
        Anything {
          Any
        }

        @tokens {
          CSSModuleStart { "[[module css]]" } 
          CSSModuleEnd { "[[/module]]" } 
          HTMLBlockStart1 { "[[html" } 
          HTMLBlockStart2 { "]]" } 
          HTMLBlockEnd { "[[/html]]" } 
          JSCommentStart { "[!--js" }
          JSCommentEnd { "--]" }
          Any { _ }
        }
`);

export const embeddedJSInCssFinderParser = buildParser(`
  @precedence { js, normal }

  @top EitherComment {
    JSComment | NormalComment
  }

  NormalComment {
    CommentOpen !normal AnyRegular CommentClose
  }

  JSComment {
    CommentOpenJS !js AnyJS CommentClose
  }

  AnyRegular {
    Any+
  }

  AnyJS {
    Any+
  }

  @tokens {
    CommentOpen { "/*" }
    CommentOpenJS { "/*js" }
    CommentClose { "*/" }
    Any { _ }

  }
  `).configure({
  wrap: parseMixed((node) => {
    if (node.name === "AnyJS") return { parser: jsParser.parser };
    return null;
  }),
});
