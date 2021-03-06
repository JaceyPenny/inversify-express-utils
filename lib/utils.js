"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var constants_2 = require("./constants");
function getControllersFromContainer(container, forceControllers) {
    if (container.isBound(constants_2.TYPE.Controller)) {
        return container.getAll(constants_2.TYPE.Controller);
    }
    else if (forceControllers) {
        throw new Error(constants_1.NO_CONTROLLERS_FOUND);
    }
    else {
        return [];
    }
}
exports.getControllersFromContainer = getControllersFromContainer;
function getControllersFromMetadata() {
    var arrayOfControllerMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, Reflect) || [];
    return arrayOfControllerMetadata.map(function (metadata) { return metadata.target; });
}
exports.getControllersFromMetadata = getControllersFromMetadata;
function getControllerMetadata(constructor) {
    var controllerMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, constructor);
    return controllerMetadata;
}
exports.getControllerMetadata = getControllerMetadata;
function getControllerMethodMetadata(constructor) {
    var methodMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controllerMethod, constructor);
    return methodMetadata;
}
exports.getControllerMethodMetadata = getControllerMethodMetadata;
function getControllerParameterMetadata(constructor) {
    var parameterMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controllerParameter, constructor);
    return parameterMetadata;
}
exports.getControllerParameterMetadata = getControllerParameterMetadata;
function cleanUpMetadata() {
    Reflect.defineMetadata(constants_1.METADATA_KEY.controller, [], Reflect);
}
exports.cleanUpMetadata = cleanUpMetadata;
function instanceOfIHttpActionResult(value) {
    return value != null && typeof value.executeAsync === "function";
}
exports.instanceOfIHttpActionResult = instanceOfIHttpActionResult;
