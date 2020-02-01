/// <reference types="node" />
import { OutgoingHttpHeaders } from "http";
export declare abstract class HttpContent {
    private _headers;
    get headers(): OutgoingHttpHeaders;
    get type(): "binary" | "text" | "template";
    abstract readAsStringAsync(): Promise<string>;
}
