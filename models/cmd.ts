import { getSupportedApplications, getInstalledApplications } from "../utils/mod.ts"
import { cliffy } from "../deps.ts"

const apps = getSupportedApplications()
const installed = getInstalledApplications()

const colors = cliffy.colors

export const listApplications = () => {
    console.log(colors.bold.blue("Available applications"), "\n")

    const table = cliffy.Table.from([[colors.blue("Name"), colors.blue("Status")]])

    apps.forEach((app) => {
        table.push([
            app.name,
            installed.some((a) => a.name == app.name) ? colors.bold.green("installed") : colors.yellow("not installed"),
        ])
    })

    table.render()
}
