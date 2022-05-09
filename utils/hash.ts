import { crypto } from "../deps.ts";

export const calcHashForever = async (count: number) => {
  const randomText = crypto.randomUUID();
  let hash = await calcHash(randomText);

  for (let i = 0; i < count; i++) {
    hash = hash + await calcHash(hash);
    console.log(hash);
  }
};

const calcHash = async (text: string) => {
  const buffer = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(
    "SHA3-256",
    buffer,
  );

  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );

  return hashHex;
};
