import {
  applicationsPath,
  detectArch,
  File,
  getInstalledApplications,
  getSupportedApplications,
  Net,
  setupAlloyPath,
  Seven,
  ALLOY_VERSION
} from "../utils/mod.ts";
import { cliffy, Prompt } from "../deps.ts";
import { Application } from "../types/application.ts";

setupAlloyPath();

const apps = await getSupportedApplications();
const installed = getInstalledApplications();

const colors = cliffy.colors;

export const installApplication = async (appName: string) => {
  const app = apps.find((app) => app.argName === appName);
  if (!app) {
    console.error(colors.red(`Application ${appName} not found.`));
    return;
  }

  await install(app);
};

export const uninstallApplication = async (appName: string) => {
  const app = apps.find((app) => app.argName === appName);
  if (!app) {
    console.error(colors.red(`Application ${appName} not found.`));
    return;
  }

  const installedApp = installed.find((app) => app.name === app.name);
  if (!installedApp) {
    console.error(colors.red(`Application ${appName} not installed.`));
    return;
  }

  const confirmed = await Prompt.Confirm.prompt("Are you sure?");

  if (!confirmed) {
    console.log(colors.red("Aborted."));
    return;
  }

  console.log(colors.blue(`Uninstalling ${app.name}...`));

  await File.rm(applicationsPath + "/" + app.name + ".app");

  console.log(colors.green(`${app.name} has been uninstalled.`), "\n");

  return;
};

export const listApplications = () => {
  console.log(colors.bold.blue("Available applications"), "\n");

  const table = cliffy.Table.from([[
    colors.blue("Name"),
    colors.blue("Arg"),
    colors.blue("Status"),
  ]]);

  apps.forEach((app) => {
    table.push([
      app.name,
      colors.bold(app.argName),
      installed.some((a) => a.name == app.name)
        ? colors.bold.green("installed")
        : colors.yellow("not installed"),
    ]);
  });

  table.render();
};

export const updateSelf = async () => {

  console.log(colors.blue("Updating alloy..."));

  const location = await fetch("https://deno.land/x/alloy").then((res) => {
    return res.url
  });

  if (!location) {
    console.error(colors.red("Could not find the latest version."));
    return;
  }

  const latestTag = location.replace("/x/alloy@", "");

  if (latestTag <= ALLOY_VERSION) {
    console.log(colors.green("Already up to date."));
    return;
  }

  try {
    const deno = Deno.run({
      cmd: [
        Deno.execPath(),
        "install",
        "-fqAn",
        "alloy",
        "--unstable",
        `https://deno.land/x/alloy@${latestTag}/main.ts`,
      ],
    });

    await deno.status();
    deno.close();

    console.log(colors.bold.green("Alloy has been updated."));
    return;
  } catch (error) {
    console.log(colors.bold.red("Update failed."));
    console.error(colors.red("Error: " + error.message));
  }
};

export const undmg = async (path: string, to?: string) => {
  if (to) {
    console.log(colors.blue(`Ouput path specified: ${to}`));
  }

  console.log(colors.blue(`Extracting ${path}...`));

  const output = await Seven.extractDMG(path, to);

  console.log("Extracted to:", output);

  console.log(colors.green("Extraction complete."));

  return;
};

export const bribe = async (path: string) => {
  console.log(colors.blue(`Bribing ${path}...`));

  try {
    await File.bribe(path);

    console.log(colors.green("Bribe successful."), "\n");
  } catch (error) {
    console.debug(error);
    console.error(colors.red("Bribe failed."), "\n");
  }
};

const install = async (app: Application) => {
  const downloadURL = (() => {
    const universal = app.downloadURL.find((url) => url.arch === "universal");

    if (universal) {
      return universal.url;
    }

    const arch = detectArch();

    const url = app.downloadURL.find((url) => url.arch === arch);

    if (url) {
      return url.url;
    }

    console.error(
      colors.red(`No download URL for ${app.name} for ${arch} architecture.`),
    );
    return;
  })();

  if (!downloadURL) {
    return;
  }

  console.log(colors.green(`Application ${app.name} found!`));

  console.log(colors.blue(`Installing ${app.name}...`));

  const downloadedPath = await Net.download(downloadURL);

  console.log("Downloaded to:", downloadedPath);

  console.log(colors.blue(`Extracting ${app.name}...`));

  const output = await Seven.extractDMG(
    downloadedPath,
    await Deno.makeTempDir({ prefix: "alloy_output_" }),
  );

  console.log("Extracted to:", output);

  console.log(colors.blue(`Granting permissions ${app.name}...`));

  const appPath = await File.chmod(output + app.appPath, 777, true);

  console.log("Permissions granted to:", appPath);

  const movedPath = await File.move(
    appPath,
    applicationsPath + "/" + app.name + ".app",
  );

  console.log(
    colors.green(`${app.name} has been installed to ${movedPath}`),
  );

  console.log(colors.blue("Cleaning up..."));

  await File.rm(downloadedPath);

  console.log(colors.green("Cleaned up."), "\n");

  console.log(colors.bold.green(`${app.name} installed successfully!`));
};
