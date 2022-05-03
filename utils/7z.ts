import { ALLOY_7Z_PATH, File, Net } from "./mod.ts";

/**
 * download 7z from alloy repository
 * @returns {Promise<string>} path to 7z binary
 */
export const get7z = async (): Promise<string> => {
  // check if 7z is already downloaded
  const path = ALLOY_7Z_PATH;

  try {
    await Deno.stat(path).then((stat) => stat.isFile);
    return path;
  } catch {
    const url = "https://deno.land/x/alloy/res/bin/7zz";

    const downloadedPath = await Net.download(url);

    await Deno.copyFile(downloadedPath, path);

    await File.chmod(path, 777, false);

    return await get7z();
  }
};

/**
 * Extract DMG
 * @param dmg pass the path to the dmg file
 * @param to extract to
 * @param debug if true, will print the output of 7z
 * @returns the path to the extracted folder
 */
export const extractDMG = async (
  dmg: string,
  to?: string,
  debug = false,
) => {
  const outputPath = to;

  const sevenZipPath = await get7z();

  const command = [sevenZipPath, "x", dmg];

  if (outputPath) {
    command.push("-o" + outputPath);
  }

  const p = Deno.run({
    cmd: command,
    stdout: debug ? "inherit" : "null",
    stderr: debug ? "inherit" : "null",
  });

  await p.status();

  p.close();

  return outputPath;
};
