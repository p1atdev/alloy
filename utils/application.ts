import { Application } from "../types/application.ts";
import { ALLOY_APPLICATIONS_PATH } from "./settings.ts";

export const applicationsPath = (() => {
  const path = ALLOY_APPLICATIONS_PATH;

  try {
    Deno.readDirSync(path);
  } catch {
    Deno.mkdirSync(path, { recursive: true });
  }

  return Deno.realPathSync(path);
})();

// TODO: add type for json
export const getSupportedApplications = async (): Promise<Application[]> => {
  const json = await fetch("https://deno.land/x/alloy/static/supports.json")
    .then((res) => res.json());

  return json.supported;
};

export const getInstalledApplications = (): Application[] => {
  const appsDir = Deno.readDirSync(applicationsPath);

  const apps = Array.from(appsDir).map((app) => {
    return {
      name: app.name.split(".").slice(0, -1).join("."),
    } as Application;
  });

  return apps;
};
