import {
  ALLOY_7Z_PATH,
  File,
  getSupportedApplications,
  Net,
  setupAlloyPath,
  Seven,
} from "../utils/mod.ts";
import { assertEquals, assertExists } from "../deps.ts";

setupAlloyPath();

Deno.test("check 7zip", async () => {
  await File.rm(ALLOY_7Z_PATH);

  const sevenZipPath = await Seven.get7z();

  assertExists(sevenZipPath);
});

Deno.test("extract DMG", async () => {
  const apps = await getSupportedApplications();

  assertExists(apps);

  const spotify = apps[0];

  assertExists(spotify);

  const spotifyURL = spotify.downloadURL.find((url) => url.arch === "x86_64");

  assertExists(spotifyURL);
  assertEquals(
    spotifyURL.url,
    "https://download.scdn.co/Spotify.dmg",
  );

  const downloadedPath = await Net.download(spotifyURL.url);

  assertExists(downloadedPath);

  const output = await Seven.extractDMG(
    downloadedPath,
    downloadedPath.replace(".dmg", ""),
  );

  assertExists(output);
});
