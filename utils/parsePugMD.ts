import parseMDPug from "./parseMDPug";
import { install, configure } from "browserfs";
import type Pug from "pug";
install(globalThis);
let pug: typeof Pug;
export const initPromise = new Promise<void>((resolve) => {
  configure(
    {
      fs: "InMemory",
      options: {},
    },
    function (e) {
      if (e) {
        // An error happened!
        resolve();
        throw e;
      }
      // Otherwise, BrowserFS is ready-to-use!
      import("assets/js/pug.min.js?raw").then((rawJS) => {
        eval(rawJS.default);
        pug = require("pug");
        resolve();
      });
    },
  );
});
let outerFootnote = "";
let outerVariables: { [key: string]: unknown } = {};
const options = {
  filters: {
    md: (text: string) => {
      return parseMDPug(text, outerFootnote, outerVariables);
    },
  },
};

export default (
  pugmd: string,
  footnote: string = "Footnote",
  variables?: { [key: string]: unknown },
) => {
  outerFootnote = footnote;
  outerVariables = variables || {};
  outerVariables["md"] = (text: string) =>
    parseMDPug(text, footnote, outerVariables);
  //   console.log(
  //     pug
  //       .compile(
  //         '- b = (b) => {var o = pug_html; pug_html = ""; b(); var e = pug_html; pug_html = o;return e}, r = (s) => pug_html += s\n' +
  //           pugmd,
  //         options,
  //       )
  //       .toString(),
  //   );
  let topLevel: boolean;
  //@ts-ignore
  (topLevel = globalThis.s === undefined) && (globalThis.s = pugmd);
  const rendered = pug.compile(
    '- var b = (b) => {var o = pug_html; pug_html = ""; b(); var e = pug_html; pug_html = o;return e}, r = (s) => pug_html += s\nmixin md\n  - r(md(b(block)))\n' +
      pugmd,
    options,
  )(outerVariables);
  // @ts-ignore
  topLevel && (globalThis.s = undefined);
  return rendered;
};
