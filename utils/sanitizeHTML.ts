import createDomPurify from "dompurify";
const DomPurify = createDomPurify();
const isATag = (node: Element): node is HTMLAnchorElement =>
  node.tagName === "A";
DomPurify.addHook("afterSanitizeAttributes", (node) => {
  if (isATag(node) && !node.getAttribute("href")?.match(/^#/)) {
    node.setAttribute("target", "_top");
    node.setAttribute("rel", "noopener noreferrer");
  }
});
const sanitize = DomPurify.sanitize;

export default (dirty: string, allowStyle: boolean = false) =>
  allowStyle ? sanitize(dirty) : sanitize(dirty, { FORBID_TAGS: ["style"] });
