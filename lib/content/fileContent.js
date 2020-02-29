"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var httpContent_1 = require("./httpContent");
var FileContent = /** @class */ (function (_super) {
    __extends(FileContent, _super);
    function FileContent(filePath) {
        var _this = _super.call(this) || this;
        _this.filePath = filePath;
        return _this;
    }
    Object.defineProperty(FileContent.prototype, "type", {
        get: function () {
            return "file";
        },
        enumerable: true,
        configurable: true
    });
    FileContent.prototype.readAsStringAsync = function () {
        throw new Error("Do not attempt to read strings from TemplateContent");
    };
    return FileContent;
}(httpContent_1.HttpContent));
exports.FileContent = FileContent;
