import { cliffy } from "./deps.ts";

const colors = cliffy.colors;

console.log(colors.blue("Start to install alloy..."));

try {
  const p = Deno.run({
    cmd: [
      Deno.execPath(),
      "install",
      "-fqAn",
      "alloy",
      "--unstable",
      "https://deno.land/x/alloy/main.ts",
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
