import {} from "./utils/mod.ts";
import { CMD } from "./models/mod.ts";
import { cliffy } from "./deps.ts";

await new cliffy.Command()
  .name("alloy")
  .version("v0.0.1")
  .description("Alloy is a tool for managing your macOS applications.")
  .arguments("<command>")
  .command("install", "Install an application.")
  .option("-l, --list", "List all available applications.")
  .arguments("[app]")
  .action((options, ...args) => {
    if (options.list) {
      CMD.listApplications();
      return;
    }

    const appName = args[0];

    if (!appName) {
      console.error("No application specified.");
      console.error("Use --help for more information.");
      return;
    }

    CMD.installApplication(appName);
  })
  .command("uninstall", "Uninstall an application.")
  .arguments("<app>")
  .command("list", "List all applications.")
  .action(() => {
    CMD.listApplications();
  })
  .command("update", "Update an application.")
  .arguments("<app>")
  .option("-a, --all", "Update all installed applications.")
  .command("update-self", "Update this application.")
  .command("undmg", "Extract a DMG file.")
  .arguments("<dmg>")
  .option("-o, --output <path>", "Output path.")
  .command("bribe", "Remove quarantine from an application.")
  .command("grant", "Grant permissions to run an application.")
  .parse(Deno.args);
