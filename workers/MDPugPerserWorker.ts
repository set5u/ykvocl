import parseMDPug from "~/utils/parseMDPug";
import { initPromise } from "~/utils/parsePugMD";
addEventListener(
  "message",
  async (ev: {
    data: {
      mdpug: string;
      footnotes: string;
      variables: { [key: string]: unknown };
    };
  }) => {
    try {
      await initPromise;
      const result = parseMDPug(
        ev.data.mdpug,
        ev.data.footnotes,
        ev.data.variables,
      );
      postMessage({ result });
    } catch (error) {
      postMessage({ error });
    }
  },
);
