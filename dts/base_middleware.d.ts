import * as express from "express";
import { interfaces as inversifyInterfaces } from "inversify";
import { interfaces } from "./interfaces";
export declare abstract class BaseMiddleware implements BaseMiddleware {
    protected readonly httpContext: interfaces.HttpContext;
    protected bind<T>(serviceIdentifier: inversifyInterfaces.ServiceIdentifier<T>): inversifyInterfaces.BindingToSyntax<T>;
    abstract handler(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
