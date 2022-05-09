import { calcHashForever } from "../utils/mod.ts";

Deno.test("calc hash", async () => {
  const strain = 2000;

  await Promise.all([...Array(strain * strain)].map(async () => {
    await calcHashForever(strain);
  }));
});
