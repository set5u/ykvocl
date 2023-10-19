export default (text: string, cursor: number) => {
  return text.substring(0, cursor).match(/\n/g)?.length || 0;
};
