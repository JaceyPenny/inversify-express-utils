import { interfaces } from "./interfaces";
import { PARAMETER_TYPE } from "./constants";
export declare const injectHttpContext: (target: any, targetKey: string, index?: number | undefined) => void;
export declare function controller(path?: string, ...middleware: interfaces.Middleware[]): (target: any) => void;
export declare function all(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpGet(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpPost(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpPut(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpPatch(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpHead(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpDelete(path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare function httpMethod(method: string, path: string, ...middleware: interfaces.Middleware[]): interfaces.HandlerDecorator;
export declare const request: () => ParameterDecorator;
export declare const response: () => ParameterDecorator;
export declare const requestParam: (paramName?: string) => ParameterDecorator;
export declare const queryParam: (queryParamName?: string) => ParameterDecorator;
export declare const requestBody: () => ParameterDecorator;
export declare const requestHeaders: (headerName?: string) => ParameterDecorator;
export declare const cookies: (cookieName?: string) => ParameterDecorator;
export declare const next: () => ParameterDecorator;
export declare const principal: () => ParameterDecorator;
export declare function params(type: PARAMETER_TYPE, parameterName?: string): (target: Object, methodName: string, index: number) => void;
