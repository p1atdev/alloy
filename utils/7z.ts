export const extractDMG = async (dmg: string, to?: string) => {
  const outputPath = to;

  const command = [Deno.cwd() + "/res/bin/7zz", "x", dmg];

  if (outputPath) {
    command.push("-o" + outputPath);
  }

  const p = Deno.run({
    cmd: command,
    stdout: "null",
    stderr: "null",
  });

  await p.status();

  p.close();

  return outputPath;
};
