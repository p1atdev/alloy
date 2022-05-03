import { getSupportedApplications, Net } from "../utils/mod.ts";
import { assertExists } from "../deps.ts";

Deno.test("test of downloading", async () => {
  const apps = await getSupportedApplications();
  const spotifyURL = apps[0].downloadURL.find((url) => url.arch === "x86_64");

  assertExists(spotifyURL);

  const downloadedPath = await Net.download(spotifyURL.url);

  assertExists(downloadedPath);
});
