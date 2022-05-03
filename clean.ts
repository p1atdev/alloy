console.log("Clean alloy temp folders");

const tmpDir = Deno.makeTempDirSync({ prefix: "alloy_" });

// get parent dir
const parentDir = tmpDir.replace(/\/[^/]*$/, "");

await Promise.all(
  Array.from(Deno.readDirSync(parentDir)).map(async (dir) => {
    if (dir.name.startsWith("alloy_")) {
      const path = `${parentDir}/${dir.name}`;

      await Deno.chmod(path, 0o777);

      await Deno.remove(path, { recursive: true });
    }
  }),
);

console.log("Cleaned");
