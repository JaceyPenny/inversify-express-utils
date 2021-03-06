"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var httpResponseMessage_1 = require("./httpResponseMessage");
var InversifyExpressServer = /** @class */ (function () {
    /**
     * Wrapper for the express server.
     *
     * @param container Container loaded with all controllers and their dependencies.
     * @param customRouter optional express.Router custom router
     * @param routingConfig optional interfaces.RoutingConfig routing config
     * @param customApp optional express.Application custom app
     * @param authProvider optional interfaces.AuthProvider auth provider
     * @param forceControllers optional boolean setting to force controllers (defaults do true)
     */
    function InversifyExpressServer(container, options) {
        if (options === void 0) { options = {}; }
        this._container = container;
        this._forceControllers =
            options.forceControllers === undefined ? true : options.forceControllers;
        this._router = options.customRouter || express.Router();
        this._routingConfig = options.routingConfig || {
            rootPath: constants_1.DEFAULT_ROUTING_ROOT_PATH
        };
        this._app = options.customApp || express();
        if (options.authProvider) {
            this._AuthProvider = options.authProvider;
            container.bind(constants_1.TYPE.AuthProvider)
                .to(this._AuthProvider);
        }
        if (options.finishHandler) {
            this._FinishHandler = options.finishHandler;
            container.bind(constants_1.TYPE.FinishHandler).to(this._FinishHandler);
        }
        this._contextInitializer = options.contextInitializer || function (c) { };
    }
    /**
     * Sets the configuration function to be applied to the application.
     * Note that the config function is not actually executed until a call to InversifyExpresServer.build().
     *
     * This method is chainable.
     *
     * @param fn Function in which app-level middleware can be registered.
     */
    InversifyExpressServer.prototype.setConfig = function (fn) {
        this._configFn = fn;
        return this;
    };
    /**
     * Sets the error handler configuration function to be applied to the application.
     * Note that the error config function is not actually executed until a call to InversifyExpresServer.build().
     *
     * This method is chainable.
     *
     * @param fn Function in which app-level error handlers can be registered.
     */
    InversifyExpressServer.prototype.setErrorConfig = function (fn) {
        this._errorConfigFn = fn;
        return this;
    };
    /**
     * Applies all routes and configuration to the server, returning the express application.
     */
    InversifyExpressServer.prototype.build = function () {
        var _this = this;
        var _self = this;
        // The very first middleware to be invoked
        // it creates a new httpContext and attaches it to the
        // current request as metadata using Reflect
        this._app.all("*", function (req, res, next) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var httpContext;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _self._createHttpContext(req, res, next)];
                        case 1:
                            httpContext = _a.sent();
                            Reflect.defineMetadata(constants_1.METADATA_KEY.httpContext, httpContext, req);
                            next();
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
        // register server-level middleware before anything else
        if (this._configFn) {
            this._configFn.apply(undefined, [this._app]);
        }
        this.registerControllers();
        // register error handlers after controllers
        if (this._errorConfigFn) {
            this._errorConfigFn.apply(undefined, [this._app]);
        }
        return this._app;
    };
    InversifyExpressServer.prototype.registerControllers = function () {
        var _this = this;
        // Fake HttpContext is needed during registration
        this._container.bind(constants_1.TYPE.HttpContext).toConstantValue({});
        var constructors = utils_1.getControllersFromMetadata();
        constructors.forEach(function (constructor) {
            var name = constructor.name;
            if (_this._container.isBoundNamed(constants_1.TYPE.Controller, name)) {
                throw new Error(constants_1.DUPLICATED_CONTROLLER_NAME(name));
            }
            _this._container.bind(constants_1.TYPE.Controller)
                .to(constructor)
                .whenTargetNamed(name);
        });
        var controllers = utils_1.getControllersFromContainer(this._container, this._forceControllers);
        controllers.forEach(function (controller) {
            var controllerMetadata = utils_1.getControllerMetadata(controller.constructor);
            var methodMetadata = utils_1.getControllerMethodMetadata(controller.constructor);
            var parameterMetadata = utils_1.getControllerParameterMetadata(controller.constructor);
            if (controllerMetadata && methodMetadata) {
                var controllerMiddleware_1 = _this.resolveMiddleware.apply(_this, controllerMetadata.middleware);
                methodMetadata.forEach(function (metadata) {
                    var _a;
                    var paramList = [];
                    if (parameterMetadata) {
                        paramList = parameterMetadata[metadata.key] || [];
                    }
                    var handler = _this.handlerFactory(controllerMetadata.target.name, metadata.key, paramList);
                    var routeMiddleware = _this.resolveMiddleware.apply(_this, metadata.middleware);
                    var finishHandler = _this.resolveFinishHandler();
                    (_a = _this._router)[metadata.method].apply(_a, ["" + controllerMetadata.path + metadata.path].concat(controllerMiddleware_1, routeMiddleware, [handler,
                        finishHandler]));
                });
            }
        });
        this._app.use(this._routingConfig.rootPath, this._router);
    };
    InversifyExpressServer.prototype.resolveMiddleware = function () {
        var _this = this;
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i] = arguments[_i];
        }
        return middleware.map(function (middlewareItem) {
            if (!_this._container.isBound(middlewareItem)) {
                return middlewareItem;
            }
            var m = _this._container.get(middlewareItem);
            if (m instanceof index_1.BaseMiddleware) {
                var _self_1 = _this;
                return function (req, res, next) {
                    var mReq = _self_1._container.get(middlewareItem);
                    mReq.httpContext = _self_1._getHttpContext(req);
                    mReq.handler(req, res, next);
                };
            }
            return m;
        });
    };
    InversifyExpressServer.prototype.resolveFinishHandler = function () {
        var _this = this;
        return function (req) {
            if (!_this._FinishHandler) {
                return;
            }
            var httpContext = _this._getHttpContext(req);
            var handler = httpContext.container.get(constants_1.TYPE.FinishHandler);
            try {
                handler.handle(req);
            }
            catch (error) {
                // do nothing; we can't risk propagating an error since the response
                // should've been sent by this point
            }
        };
    };
    InversifyExpressServer.prototype.copyHeadersTo = function (headers, target) {
        for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var headerValue = headers[name_1];
            target.append(name_1, typeof headerValue === "number" ? headerValue.toString() : headerValue);
        }
    };
    InversifyExpressServer.prototype.handleHttpResponseMessage = function (message, res) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, templateFilePath, templateData, filePath, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.copyHeadersTo(message.headers, res);
                        if (!(message.content !== undefined)) return [3 /*break*/, 6];
                        this.copyHeadersTo(message.content.headers, res);
                        if (!(message.content.type === "binary")) return [3 /*break*/, 1];
                        buffer = message.content.content;
                        res.status(message.statusCode).end(buffer);
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(message.content.type === "template")) return [3 /*break*/, 2];
                        templateFilePath = message.content.templateFilePath;
                        templateData = message.content.templateData;
                        res.status(message.statusCode).render(templateFilePath, templateData);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(message.content.type === "file")) return [3 /*break*/, 3];
                        filePath = message.content.filePath;
                        res.status(200).sendFile(filePath);
                        return [3 /*break*/, 5];
                    case 3:
                        _b = (_a = res.status(message.statusCode)).send;
                        return [4 /*yield*/, message.content.readAsStringAsync()];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.sendStatus(message.statusCode);
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    InversifyExpressServer.prototype.handlerFactory = function (controllerName, key, parameterMetadata) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var args, httpContext, value, httpResponseMessage, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        args = this.extractParameters(req, res, next, parameterMetadata);
                        httpContext = this._getHttpContext(req);
                        httpContext.container.bind(constants_1.TYPE.HttpContext)
                            .toConstantValue(httpContext);
                        return [4 /*yield*/, (_a = httpContext.container.getNamed(constants_1.TYPE.Controller, controllerName))[key].apply(_a, args)];
                    case 1:
                        value = _b.sent();
                        if (!(value instanceof httpResponseMessage_1.HttpResponseMessage)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleHttpResponseMessage(value, res)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!utils_1.instanceOfIHttpActionResult(value)) return [3 /*break*/, 6];
                        return [4 /*yield*/, value.executeAsync()];
                    case 4:
                        httpResponseMessage = _b.sent();
                        return [4 /*yield*/, this.handleHttpResponseMessage(httpResponseMessage, res)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        if (value instanceof Function) {
                            value();
                        }
                        else if (!res.headersSent) {
                            if (value === undefined) {
                                res.status(204);
                            }
                            res.send(value);
                        }
                        _b.label = 7;
                    case 7:
                        next();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        next(err_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
    };
    InversifyExpressServer.prototype._getHttpContext = function (req) {
        return Reflect.getMetadata(constants_1.METADATA_KEY.httpContext, req);
    };
    InversifyExpressServer.prototype._createHttpContext = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var principal, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getCurrentUser(req, res, next)];
                    case 1:
                        principal = _a.sent();
                        context = {
                            request: req,
                            response: res,
                            // We use a childContainer for each request so we can be
                            // sure that the binding is unique for each HTTP request
                            container: this._container.createChild(),
                            user: principal
                        };
                        this._contextInitializer(context);
                        return [2 /*return*/, context];
                }
            });
        });
    };
    InversifyExpressServer.prototype._getCurrentUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._AuthProvider !== undefined)) return [3 /*break*/, 2];
                        authProvider = this._container.get(constants_1.TYPE.AuthProvider);
                        return [4 /*yield*/, authProvider.getUser(req, res, next)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, Promise.resolve({
                            details: null,
                            isAuthenticated: function () { return false; },
                            isInRole: function (role) { return false; },
                            isInState: function (state) { return false; },
                        })];
                }
            });
        });
    };
    InversifyExpressServer.prototype.extractParameters = function (req, res, next, params) {
        var _this = this;
        var args = [];
        if (!params || !params.length) {
            return [req, res, next];
        }
        params.forEach(function (_a) {
            var type = _a.type, index = _a.index, parameterName = _a.parameterName, injectRoot = _a.injectRoot;
            switch (type) {
                case constants_1.PARAMETER_TYPE.REQUEST:
                    args[index] = req;
                    break;
                case constants_1.PARAMETER_TYPE.NEXT:
                    args[index] = next;
                    break;
                case constants_1.PARAMETER_TYPE.PARAMS:
                    args[index] = _this.getParam(req, "params", injectRoot, parameterName);
                    break;
                case constants_1.PARAMETER_TYPE.QUERY:
                    args[index] = _this.getParam(req, "query", injectRoot, parameterName);
                    break;
                case constants_1.PARAMETER_TYPE.BODY:
                    args[index] = req.body;
                    break;
                case constants_1.PARAMETER_TYPE.HEADERS:
                    args[index] = _this.getParam(req, "headers", injectRoot, parameterName);
                    break;
                case constants_1.PARAMETER_TYPE.COOKIES:
                    args[index] = _this.getParam(req, "cookies", injectRoot, parameterName);
                    break;
                case constants_1.PARAMETER_TYPE.PRINCIPAL:
                    args[index] = _this._getPrincipal(req);
                    break;
                default:
                    args[index] = res;
                    break; // response
            }
        });
        args.push(req, res, next);
        return args;
    };
    InversifyExpressServer.prototype.getParam = function (source, paramType, injectRoot, name) {
        if (paramType === "headers" && name) {
            name = name.toLowerCase();
        }
        var param = source[paramType];
        if (injectRoot) {
            return param;
        }
        else {
            return (param && name) ? param[name] : undefined;
        }
    };
    InversifyExpressServer.prototype._getPrincipal = function (req) {
        return this._getHttpContext(req).user;
    };
    return InversifyExpressServer;
}());
exports.InversifyExpressServer = InversifyExpressServer;
