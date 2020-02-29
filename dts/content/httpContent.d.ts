/// <reference types="node" />
import { OutgoingHttpHeaders } from "http";
export declare abstract class HttpContent {
    private _headers;
    readonly headers: OutgoingHttpHeaders;
    readonly type: "binary" | "text" | "template" | "file";
    abstract readAsStringAsync(): Promise<string>;
}
