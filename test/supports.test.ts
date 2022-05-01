import { getSupportedApplications } from "../utils/mod.ts"

Deno.test("get supported applications", () => {
    const apps = getSupportedApplications()
    console.log(apps)
})
