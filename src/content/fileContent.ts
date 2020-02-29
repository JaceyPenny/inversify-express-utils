import { HttpContent } from "./httpContent";

export class FileContent extends HttpContent {
  public filePath: string;

  public get type(): "file" {
    return "file";
  }

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  public readAsStringAsync(): Promise<string> {
    throw new Error("Do not attempt to read strings from TemplateContent");
  }
}
