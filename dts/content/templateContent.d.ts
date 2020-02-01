import { HttpContent } from "./httpContent";
export declare class TemplateContent extends HttpContent {
    templateFilePath: string;
    templateData: any;
    readonly type: "template";
    constructor(templateFilePath: string, templateData?: any);
    readAsStringAsync(): Promise<string>;
}
