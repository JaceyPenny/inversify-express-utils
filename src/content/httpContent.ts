import { OutgoingHttpHeaders } from "http";

export abstract class HttpContent {
  private _headers: OutgoingHttpHeaders = {};

  public get headers() {
    return this._headers;
  }

  public get type(): "binary" | "text" | "template" {
    return "text";
  }

  public abstract readAsStringAsync(): Promise<string>;
}
