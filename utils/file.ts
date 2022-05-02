export const bribe = async (path: string) => {
  const p = Deno.run({
    cmd: ["xattr", "-drs", "com.apple.quarantine", path],
  });

  await p.status();
  p.close();

  return path;
};

export const chmod = async (path: string, mode: number, inside: boolean) => {
  const command = ["chmod"];

  if (inside) {
    command.push("-R");
  }

  const args = [mode.toString(), path];

  args.forEach((arg) => {
    command.push(arg);
  });

  const p = Deno.run({
    cmd: command,
  });

  await p.status();
  p.close();

  return path;
};

export const move = async (from: string, to: string) => {
  const p = Deno.run({
    cmd: ["mv", "-f", from, to],
  });

  await p.status();
  p.close();

  return to;
};

export const rm = async (path: string) => {
  const chmod = Deno.run({
    cmd: ["chmod", "-R", "777", path],
  });
  await chmod.status();
  chmod.close();

  const rm = Deno.run({
    cmd: ["rm", "-rf", path],
  });
  await rm.status();
  rm.close();
};
