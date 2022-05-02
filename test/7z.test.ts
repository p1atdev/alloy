import { File, getSupportedApplications, Net, Seven } from "../utils/mod.ts";
import { assertExists } from "../deps.ts";

Deno.test("check 7zip", () => {
  const p = Deno.run({
    cmd: [Deno.cwd() + "/res/bin/7zz", "--help"],
    stdout: "null",
    stderr: "null",
  });

  assertExists(p.pid);

  p.close();
});

Deno.test("extract DMG", async () => {
  const apps = getSupportedApplications();
  const spotify = apps[0];
  const spotifyURL = spotify.downloadURL.find((url) => url.arch === "x86_64");

  assertExists(spotifyURL);

  const downloadedPath = await Net.download(spotifyURL.url);

  const output = await Seven.extractDMG(downloadedPath);

  assertExists(output);

  const appPath = await File.chmod(output + spotify.appPath, 777, true);

  assertExists(appPath);
});
