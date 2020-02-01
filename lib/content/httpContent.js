"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpContent = /** @class */ (function () {
    function HttpContent() {
        this._headers = {};
    }
    Object.defineProperty(HttpContent.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpContent.prototype, "type", {
        get: function () {
            return "text";
        },
        enumerable: true,
        configurable: true
    });
    return HttpContent;
}());
exports.HttpContent = HttpContent;
