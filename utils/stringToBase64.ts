export default (text: string) => btoa(unescape(encodeURIComponent(text)));
