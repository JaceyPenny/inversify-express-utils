import * as express from "express";
import { interfaces as inversifyInterfaces } from "inversify";
import { PARAMETER_TYPE } from "./constants";
import { HttpResponseMessage } from "./httpResponseMessage";
declare namespace interfaces {
    type Middleware = (inversifyInterfaces.ServiceIdentifier<any> | express.RequestHandler);
    interface ControllerMetadata {
        path: string;
        middleware: Middleware[];
        target: any;
    }
    interface ControllerMethodMetadata extends ControllerMetadata {
        method: string;
        key: string;
    }
    interface ControllerParameterMetadata {
        [methodName: string]: ParameterMetadata[];
    }
    interface ParameterMetadata {
        parameterName?: string;
        injectRoot: boolean;
        index: number;
        type: PARAMETER_TYPE;
    }
    interface Controller {
    }
    interface HandlerDecorator {
        (target: any, key: string, value: any): void;
    }
    interface ConfigFunction {
        (app: express.Application): void;
    }
    interface RoutingConfig {
        rootPath: string;
    }
    interface Principal {
        details: any;
        isAuthenticated(): boolean;
        isInState(state: string): boolean;
        isInRole(role: string): boolean;
    }
    interface AuthProvider {
        getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Principal>;
    }
    interface FinishHandler {
        handle(req: express.Request): void;
    }
    interface HttpContext {
        request: express.Request;
        response: express.Response;
        container: inversifyInterfaces.Container;
        user: Principal;
    }
    interface IHttpActionResult {
        executeAsync(): Promise<HttpResponseMessage>;
    }
}
export { interfaces };
