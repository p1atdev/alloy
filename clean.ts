console.log("Clean alloy temp folders");

const tmpDir = Deno.makeTempDirSync({ prefix: "alloy_" });

// get parent dir
const parentDir = tmpDir.replace(/\/[^/]*$/, "");

Array.from(Deno.readDirSync(parentDir)).map(async (dir) => {
  if (dir.name.startsWith("alloy_")) {
    const path = `${parentDir}/${dir.name}`;
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
  }
});

console.log("Cleaned");
