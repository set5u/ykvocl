import { Marked, Renderer } from "marked";
import parsePugMD from "./parsePugMD";

// @ts-ignore
import extendedTables from "marked-extended-tables";

import hljs from "highlight.js";

import markedKatex from "marked-katex-extension";

import markedLinkifyIt from "marked-linkify-it";
import tlds from "tlds";

import markedFootnote from "marked-footnote";

const renderer = new Renderer();
let outerFootnote = "";
let outerVariables: { [key: string]: unknown } | undefined = {};
renderer.code = (code, info) => {
  if (info === "!pug") {
    return parsePugMD(code, outerFootnote, outerVariables);
  } else {
    const language = hljs.getLanguage(info || "") ? info || "" : "plaintext";
    const parsed = hljs.highlight(code, { language }).value;
    return `<pre><code>${parsed}</code></pre>`;
  }
};

export default (
  mdpug: string,
  footnotes: string = "Footnotes",
  variables?: { [key: string]: unknown },
) => {
  outerFootnote = footnotes;
  outerVariables = variables;
  const marked = new Marked();

  marked.use(extendedTables());

  marked.use(markedKatex({ throwOnError: false }));
  marked.use(
    markedLinkifyIt(
      {
        "@": {
          validate: /^[^ \/\n]*/,
          // @ts-ignore
          normalize: (match) =>
            (match.url = "https://.com/@" + match.url.replace(/^@/, "")),
        },
        "#": {
          validate: /^[^ \/\n]*/,
          // @ts-ignore
          normalize: (match) =>
            (match.url = "https://.com/s/" + encodeURIComponent(match.url)),
        },
        ":": {
          validate: /^[^ \/\n]*/,
          // @ts-ignore
          normalize: (match) =>
            (match.url = "https://.com/c/" + match.url.replace(/^\:/, "")),
        },
      },
      { fuzzyLink: false, tlds },
    ),
  );
  marked.use(markedFootnote({ description: footnotes }));
  const parsed = marked.parse(mdpug, { breaks: true, renderer }) as string;
  return parsed;
};
