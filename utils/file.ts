export const bribe = async (path: string) => {
    const p = Deno.run({
        cmd: ["xattr", "-drs", "com.apple.quarantine", path],
    })

    await p.status()
    p.close()

    return path
}
