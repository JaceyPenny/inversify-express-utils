import { HttpContent } from "./httpContent";

const DEFAULT_MEDIA_TYPE = "application/octet-stream";

export class BinaryContent extends HttpContent {
  public content: Buffer;

  public get type(): "binary" {
    return "binary";
  }

  constructor(buffer: Buffer, contentType: string = DEFAULT_MEDIA_TYPE) {
    super();
    this.content = buffer;
    this.headers["content-type"] = contentType;
  }

  public readAsStringAsync(): Promise<string> {
    throw new Error("Do not attempt to read strings from BinaryContent");
  }
}
