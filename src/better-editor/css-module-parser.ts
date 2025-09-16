import { buildParser } from "@lezer/generator";

export const cssModuleParser = buildParser(`
        @top Program {
          (CSSModule | HTMLBlock | Anything)+
        }
        
        CSSModule {
          CSSModuleStart CSSModuleContent CSSModuleEnd
        }

        HTMLBlock {
          HTMLBlockStart1 Any* HTMLBlockStart2 HTMLBlockContent HTMLBlockEnd
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
          Any { _ }
        }
`);
