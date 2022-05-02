import { getSupportedApplications, download } from "../utils/mod.ts"
import { assertExists } from "../deps.ts"

Deno.test("test of downloading", async () => {
    const apps = getSupportedApplications()
    const spotifyURL = apps[0].downloadURL.find((url) => url.arch === "x86_64")

    assertExists(spotifyURL)

    const downloadedPath = await download(spotifyURL.url)

    assertExists(downloadedPath)
})
