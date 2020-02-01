/// <reference types="node" />
import { HttpContent } from "./httpContent";
export declare class BinaryContent extends HttpContent {
    content: Buffer;
    readonly type: "binary";
    constructor(buffer: Buffer, contentType?: string);
    readAsStringAsync(): Promise<string>;
}
