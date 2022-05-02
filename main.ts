import { getSupportedApplications, download, Seven } from "./utils/mod.ts"

const apps = getSupportedApplications()
const spotifyURL = apps[0].downloadURL.find((url) => url.arch === "x86_64")

if (!spotifyURL) {
    throw new Error("No supported application found")
}

const downloadedPath = await download(spotifyURL.url)

const output = await Seven.extractDMG(downloadedPath)

console.log(output)
