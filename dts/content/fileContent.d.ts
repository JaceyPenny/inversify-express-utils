import { HttpContent } from "./httpContent";
export declare class FileContent extends HttpContent {
    filePath: string;
    readonly type: "file";
    constructor(filePath: string);
    readAsStringAsync(): Promise<string>;
}
