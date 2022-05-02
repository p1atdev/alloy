import { Arch } from "./arch.ts";
export type Application = {
  /**
   * The name of the application (e.g. "Google Chrome")
   */
  name: string;
  /**
   * The name of the application as an argument (e.g. "chrome").
   */
  argName: string;
  /**
   * The download URL of the application.
   */
  downloadURL: DownloadURL[];
  /**
   * extracted app path
   */
  appPath: string;
};

export type DownloadURL = {
  /**
   * The CPU architecture of the application.
   */
  arch: Arch;
  /**
   * The download URL of the application.
   */
  url: string;
};
