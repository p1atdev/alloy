import { Application } from "../types/application.ts"

export const applicationsPath = (() => {
    const path = Deno.env.get("HOME") + "/Applications/Alloy"

    try {
        Deno.readDirSync(path)
    } catch {
        Deno.mkdirSync(path, { recursive: true })
    }

    return Deno.realPathSync(path)
})()

export const getSupportedApplications = (): Application[] => {
    // read json
    const json = Deno.readFileSync(Deno.cwd() + "/static/supports.json")

    // parse json
    const data = JSON.parse(new TextDecoder().decode(json))

    return data.supported
}

export const getInstalledApplications = (): Application[] => {
    const appsDir = Deno.readDirSync(applicationsPath)

    const apps = Array.from(appsDir).map((app) => {
        return {
            name: app.name.split(".").slice(0, -1).join("."),
        } as Application
    })

    return apps
}
