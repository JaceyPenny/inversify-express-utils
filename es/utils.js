import { METADATA_KEY, NO_CONTROLLERS_FOUND } from "./constants";
import { TYPE } from "./constants";
export function getControllersFromContainer(container, forceControllers) {
    if (container.isBound(TYPE.Controller)) {
        return container.getAll(TYPE.Controller);
    }
    else if (forceControllers) {
        throw new Error(NO_CONTROLLERS_FOUND);
    }
    else {
        return [];
    }
}
export function getControllersFromMetadata() {
    var arrayOfControllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];
    return arrayOfControllerMetadata.map(function (metadata) { return metadata.target; });
}
export function getControllerMetadata(constructor) {
    var controllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, constructor);
    return controllerMetadata;
}
export function getControllerMethodMetadata(constructor) {
    var methodMetadata = Reflect.getMetadata(METADATA_KEY.controllerMethod, constructor);
    return methodMetadata;
}
export function getControllerParameterMetadata(constructor) {
    var parameterMetadata = Reflect.getMetadata(METADATA_KEY.controllerParameter, constructor);
    return parameterMetadata;
}
export function cleanUpMetadata() {
    Reflect.defineMetadata(METADATA_KEY.controller, [], Reflect);
}
export function instanceOfIHttpActionResult(value) {
    return value != null && typeof value.executeAsync === "function";
}
