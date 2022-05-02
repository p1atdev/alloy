import { getSupportedApplications } from "../utils/mod.ts";
import { assertEquals } from "../deps.ts";

Deno.test("get supported applications", () => {
  const apps = getSupportedApplications();

  assertEquals(apps.length, 2);
  assertEquals(apps[0].name, "Spotify");
});
