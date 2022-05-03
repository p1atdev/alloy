import { copy, readerFromStreamReader } from "../deps.ts";

/**
 * @param url
 * @returns {Promise<string>} ダウンロードしたファイルのパス
 */
export const download = async (url: string): Promise<string> => {
  const tmpDir = await Deno.makeTempDir({ prefix: "alloy_" });

  const res = await fetch(url);

  const fileName = url.split("/").pop()!;

  const path = tmpDir + "/" + fileName;
  const file = await Deno.open(path, {
    create: true,
    write: true,
  });

  if (!res.body) {
    throw new Error("Empty response body");
  }

  await copy(readerFromStreamReader(res.body.getReader()), file);
  file.close();

  return path;
};
