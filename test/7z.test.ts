import { getSupportedApplications, download, Seven, File } from "../utils/mod.ts"
import { assertExists } from "../deps.ts"

Deno.test("check 7zip", () => {
    const p = Deno.run({
        cmd: [Deno.cwd() + "/res/bin/7zz", "--help"],
    })

    assertExists(p.pid)

    p.close()
})

Deno.test("extract DMG", async () => {
    const apps = getSupportedApplications()
    const spotify = apps[0]
    const spotifyURL = spotify.downloadURL.find((url) => url.arch === "x86_64")

    assertExists(spotifyURL)

    const downloadedPath = await download(spotifyURL.url)

    const output = await Seven.extractDMG(downloadedPath)

    assertExists(output)

    const bribedPath = await File.bribe(output + spotify.appPath)

    console.log(bribedPath)

    assertExists(bribedPath)
})
