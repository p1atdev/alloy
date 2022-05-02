import { Application } from "../types/application.ts"

export const getSupportedApplications = (): Application[] => {
    // read json
    const json = Deno.readFileSync(Deno.cwd() + "/static/supports.json")

    // parse json
    const data = JSON.parse(new TextDecoder().decode(json))

    return data.supported
}
