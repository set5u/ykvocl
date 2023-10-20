export default (text: string) => {
  return text.replaceAll(/\b.+?\b/g, (match) =>
    match.length !== 2
      ? match.charAt(0) + "*".repeat(match.length - 1)
      : "*".repeat(match.length),
  );
};
