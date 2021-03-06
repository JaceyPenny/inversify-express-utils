import * as express from "express";
import { interfaces as inversifyInterfaces } from "inversify";
import { PARAMETER_TYPE } from "./constants";
import { HttpResponseMessage } from "./httpResponseMessage";

namespace interfaces {

    export type Middleware = (inversifyInterfaces.ServiceIdentifier<any> | express.RequestHandler);

    export interface ControllerMetadata {
        path: string;
        middleware: Middleware[];
        target: any;
    }

    export interface ControllerMethodMetadata extends ControllerMetadata {
        method: string;
        key: string;
    }

    export interface ControllerParameterMetadata {
        [methodName: string]: ParameterMetadata[];
    }

    export interface ParameterMetadata {
        parameterName?: string;
        injectRoot: boolean;
        index: number;
        type: PARAMETER_TYPE;
    }

    export interface Controller { }

    export interface HandlerDecorator {
        (target: any, key: string, value: any): void;
    }

    export interface ConfigFunction {
        (app: express.Application): void;
    }

    export interface RoutingConfig {
        rootPath: string;
    }

    export interface Principal {
        details: any;
        isAuthenticated(): boolean;

        isInState(state: string): boolean;
        // Allows role-based auth
        isInRole(role: string): boolean;
    }

    export interface AuthProvider {
        getUser(
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ): Promise<Principal>;
    }

    export interface FinishHandler {
        handle(req: express.Request): void;
    }

    export interface HttpContext {
        request: express.Request;
        response: express.Response;
        container: inversifyInterfaces.Container;
        user: Principal;
    }

    export interface IHttpActionResult {
        executeAsync(): Promise<HttpResponseMessage>;
    }
}

export { interfaces };
