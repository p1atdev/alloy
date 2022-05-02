export const bribe = async (path: string) => {
    const p = Deno.run({
        cmd: ["xattr", "-drs", "com.apple.quarantine", path],
    })

    await p.status()
    p.close()

    return path
}

export const chmod = async (path: string, mode: number, inside: boolean) => {
    const command = inside ? ["chmod", "-R", mode.toString(8), path] : ["chmod", mode.toString(8), path]
    const p = Deno.run({
        cmd: command,
    })

    await p.status()
    p.close()

    return path
}

export const move = async (from: string, to: string) => {
    const p = Deno.run({
        cmd: ["mv", from, to],
    })

    await p.status()
    p.close()

    return to
}
