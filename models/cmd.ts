import {
  applicationsPath,
  detectArch,
  File,
  getInstalledApplications,
  getSupportedApplications,
  Net,
  Seven,
} from "../utils/mod.ts";
import { cliffy, Prompt } from "../deps.ts";

const apps = getSupportedApplications();
const installed = getInstalledApplications();

const colors = cliffy.colors;

export const installApplication = async (appName: string) => {
  const app = apps.find((app) => app.argName === appName);
  if (!app) {
    console.error(colors.red(`Application ${appName} not found.`));
    return;
  }

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
      colors.red(`No download URL for ${appName} for ${arch} architecture.`),
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

  const output = await Seven.extractDMG(downloadedPath);

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
