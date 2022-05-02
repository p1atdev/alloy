export type Application = {
    /**
     * The name of the application (e.g. "Google Chrome")
     */
    name: string
    /**
     * The display name of the application (e.g. "chrome").
     */
    displayName: string
    /**
     * The download URL of the application.
     */
    downloadURL: DownloadURL[]
    /**
     * extracted app path
     */
    appPath: string
}

export type DownloadURL = {
    /**
     * The CPU architecture of the application.
     */
    arch: "x64" | "x86_64" | "arm64" | "universal"
    /**
     * The download URL of the application.
     */
    url: string
}
