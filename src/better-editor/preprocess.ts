import { createEvalbox } from "../../r628/src/evalbox.js";
import { smartAsyncReplaceAll } from "../../r628/src/stringutils.js";

export async function preprocess(str: string, cursor: number, doEval: boolean) {
  const evalbox = await createEvalbox();
  const res = await smartAsyncReplaceAll(
    str,
    /\[!--GENERATED START--\][\s\S]*?\[!--GENERATED END--\]|\/\*GENERATED START\*\/[\s\S]*?\/\*GENERATED END\*\/|\[!--js[\s\S]*?--\]|\/\*js[\s\S]*?\*\/|\[\[module css\]\]\s?(\/\*[\S\s]*?\*\/)?/g,
    async (str, pos, cursor) => {
      if (str.startsWith("[[module")) {
        return `[[module css]]\n/*${window.location.pathname.slice(1).split("/")[0]}*/`;
      }

      if (str.startsWith("[!--GENERATED") || str.startsWith("/*GENERATED"))
        return "";

      if (!doEval) {
        return str;
      }

      let jscode: string;
      const isWikidot = str.startsWith("[!--");
      if (isWikidot) {
        jscode = str.slice(6, -3);
      } else {
        jscode = str.slice(4, -2);
      }

      const evalresult = await evalbox.eval(jscode);
      const generatedString = evalresult.success
        ? evalresult.data
        : evalresult.error;
      const res = `${str}${isWikidot ? `[!--GENERATED START--]` : `/*GENERATED START*/`}${generatedString}${isWikidot ? `[!--GENERATED END--]` : `/*GENERATED END*/`}`;
      return {
        str: res,
        cursorPos: cursor,
      };
    },
    { cursor }
  );
  evalbox.kill();
  return res;
}
