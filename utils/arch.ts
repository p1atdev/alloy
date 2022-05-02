import { Arch } from "../types/arch.ts";

export const detectArch = (): Arch => {
  const arch = Deno.build.arch;
  switch (arch) {
    case "x86_64": {
      return "x86_64";
    }
    case "aarch64": {
      return "arm64";
    }
    default: {
      throw new Error(`Unsupported architecture: ${arch}`);
    }
  }
};
