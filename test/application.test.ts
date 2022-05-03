import { applicationsPath, getSupportedApplications } from "../utils/mod.ts";
import { assertEquals, assertExists } from "../deps.ts";

Deno.test("fetch applications json", async () => {
  const apps = await getSupportedApplications();

  assertEquals(apps.length, 2);
  assertEquals(apps[0].name, "Spotify");
});

Deno.test("get alloy applications path", () => {
  const path = applicationsPath;
  assertExists(path);
});
