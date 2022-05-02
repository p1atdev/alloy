export const extractDMG = async (dmg: string) => {
  const outputPath = await Deno.makeTempDir({ prefix: "alloy_output_" });

  const p = Deno.run({
    cmd: [Deno.cwd() + "/res/bin/7zz", "x", dmg, "-o" + outputPath],
    stdout: "null",
    stderr: "null",
  });

  await p.status();

  p.close();

  return outputPath;
};
