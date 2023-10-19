export default (base64: string) => decodeURIComponent(escape(atob(base64)));
