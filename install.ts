import { cliffy } from "./deps.ts";
import { ALLOY_VERSION } from "./utils/mod.ts";

const colors = cliffy.colors;

console.log(colors.blue("Start installing Alloy..."));

try {
  const p = Deno.run({
    cmd: [
      Deno.execPath(),
      "install",
      "-fqAn",
      "alloy",
      "--unstable",
      `https://deno.land/x/alloy@${ALLOY_VERSION}/main.ts`,
    ],
    stdout: "piped",
  });

  await p.status();
  p.close();

  console.log(colors.green("Alloy installed successfully!"));
} catch (error) {
  console.log(colors.bold.red("Install failed."));
  console.error(colors.red("Error: " + error.message));
}
