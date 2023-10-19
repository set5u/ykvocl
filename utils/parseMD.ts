import { Marked } from "marked";
import sanitizeHTML from "./sanitizeHTML";

// @ts-ignore
import extendedTables from "marked-extended-tables";

import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import "highlight.js/styles/github.css";

import markedKatex from "marked-katex-extension";
import "katex/dist/katex.min.css";

import markedLinkifyIt from "marked-linkify-it";

import markedFootnote from "marked-footnote";

export default async (text: string, footnote: string = "Footnotes") => {
  const marked = new Marked();

  marked.use(extendedTables());

  marked.use(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  marked.use(markedKatex({ throwOnError: false }));

  marked.use(
    markedLinkifyIt({
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
    }),
  );
  marked.use(markedFootnote({ description: footnote }));
  return sanitizeHTML(await marked.parse(text, { breaks: true }));
};
