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
  .action((_options, ...args) => {
    const appName = args[0];
    if (!appName) {
      console.error("No application specified.");
      console.error("Use --help for more information.");
      return;
    }
    CMD.uninstallApplication(appName);
  })
  .command("list", "List all applications.")
  .action(() => {
    CMD.listApplications();
  })
  .command("update", "Update an application.")
  .arguments("<app>")
  .option("-a, --all", "Update all installed applications.")
  .command("update-self", "Update this application.")
  .action((_options, ..._args) => {
    CMD.updateSelf();
  })
  .command("undmg", "Extract a DMG file.")
  .arguments("<dmg>")
  .option("-o, --output <path>", "Output path.")
  .action((options, ...args) => {
    if (!args[0]) {
      console.error("No DMG file specified.");
      console.error("Use --help for more information.");
      return;
    }

    const output = options.output;

    CMD.undmg(args[0], output);
  })
  .command("bribe", "Remove quarantine from an application.")
  .arguments("<path>")
  .action((_options, ...args) => {
    if (!args[0]) {
      console.error("No path specified.");
      console.error("Use --help for more information.");
      return;
    }

    CMD.bribe(args[0]);
  })
  .command("grant", "Grant permissions to run an application.")
  .parse(Deno.args);
