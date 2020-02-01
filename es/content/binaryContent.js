var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { HttpContent } from "./httpContent";
var DEFAULT_MEDIA_TYPE = "application/octet-stream";
var BinaryContent = /** @class */ (function (_super) {
    __extends(BinaryContent, _super);
    function BinaryContent(buffer, contentType) {
        if (contentType === void 0) { contentType = DEFAULT_MEDIA_TYPE; }
        var _this = _super.call(this) || this;
        _this.content = buffer;
        _this.headers["content-type"] = contentType;
        return _this;
    }
    Object.defineProperty(BinaryContent.prototype, "type", {
        get: function () {
            return "binary";
        },
        enumerable: true,
        configurable: true
    });
    BinaryContent.prototype.readAsStringAsync = function () {
        throw new Error("Do not attempt to read strings from BinaryContent");
    };
    return BinaryContent;
}(HttpContent));
export { BinaryContent };
