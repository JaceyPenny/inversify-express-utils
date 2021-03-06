export declare const TYPE: {
    AuthProvider: symbol;
    Controller: symbol;
    HttpContext: symbol;
    FinishHandler: symbol;
};
export declare const METADATA_KEY: {
    controller: string;
    controllerMethod: string;
    controllerParameter: string;
    httpContext: string;
};
export declare enum PARAMETER_TYPE {
    REQUEST = 0,
    RESPONSE = 1,
    PARAMS = 2,
    QUERY = 3,
    BODY = 4,
    HEADERS = 5,
    COOKIES = 6,
    NEXT = 7,
    PRINCIPAL = 8
}
export declare const DUPLICATED_CONTROLLER_NAME: (name: string) => string;
export declare const NO_CONTROLLERS_FOUND: string;
export declare const DEFAULT_ROUTING_ROOT_PATH = "/";
