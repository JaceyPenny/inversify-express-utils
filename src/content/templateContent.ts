import { HttpContent } from "./httpContent";

export class TemplateContent extends HttpContent {
  public templateFilePath: string;
  public templateData: any;

  public get type(): "template" {
    return "template";
  }

  constructor(templateFilePath: string, templateData: any = {}) {
    super();
    this.templateFilePath = templateFilePath;
    this.templateData = templateData;
  }

  public readAsStringAsync(): Promise<string> {
    throw new Error("Do not attempt to read strings from TemplateContent");
  }
}
