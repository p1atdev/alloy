/**
 * Alloy version
 */
export const ALLOY_VERSION = "v0.0.6";

/**
 * The settings for the application.
 */
export const ALLOY_PATH = Deno.env.get("ALLOY_PATH") ??
  Deno.env.get("HOME") + "/.alloy";

/**
 * The path to the alloy bin directory.
 */
export const ALLOY_BIN_PATH = ALLOY_PATH + "/bin";

/**
 * The path to the 7z binary.
 */
export const ALLOY_7Z_PATH = Deno.env.get("ALLOY_7Z_PATH") ??
  ALLOY_PATH + "/bin/7z";

/**
 * The path to downloaded applications.
 */
export const ALLOY_APPLICATIONS_PATH =
  Deno.env.get("ALLOY_APPLICATIONS_PATH") ??
    Deno.env.get("HOME") + "/Applications/Alloy";

/**
 * Set up the alloy path.
 */
export const setupAlloyPath = () => {
  // if alloy path doesn't exist, create it
  try {
    Deno.readDirSync(ALLOY_PATH);
  } catch {
    Deno.mkdirSync(ALLOY_PATH, { recursive: true });
  }

  try {
    Deno.readDirSync(ALLOY_BIN_PATH);
  } catch {
    Deno.mkdirSync(ALLOY_BIN_PATH, { recursive: true });
  }
};
