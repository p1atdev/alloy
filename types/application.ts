export type Application = {
    /**
     * The name of the application.
     */
    name: string
    /**
     * The download URL of the application.
     */
    downloadURL: DownloadURL[]
}

export type DownloadURL = {
    /**
     * The CPU architecture of the application.
     */
    arch: "x64" | "arm64" | "universal"
    /**
     * The download URL of the application.
     */
    url: string
}
