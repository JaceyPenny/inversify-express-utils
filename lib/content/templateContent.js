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
var TemplateContent = /** @class */ (function (_super) {
    __extends(TemplateContent, _super);
    function TemplateContent(templateFilePath, templateData) {
        if (templateData === void 0) { templateData = {}; }
        var _this = _super.call(this) || this;
        _this.templateFilePath = templateFilePath;
        _this.templateData = templateData;
        return _this;
    }
    Object.defineProperty(TemplateContent.prototype, "type", {
        get: function () {
            return "template";
        },
        enumerable: true,
        configurable: true
    });
    TemplateContent.prototype.readAsStringAsync = function () {
        throw new Error("Do not attempt to read strings from TemplateContent");
    };
    return TemplateContent;
}(httpContent_1.HttpContent));
exports.TemplateContent = TemplateContent;
