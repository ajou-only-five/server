import TypeChecker from "./type_check.js";

const myCors = ({ allowedOrigins, headers, methods, credentials }) => {
    let _allowedOrigins = null;
    let _headers = null;
    let _methods = null;
    let _credentials = null


    if (allowedOrigins === undefined) {
        allowedOrigins = [];
    }

    if (!Array.isArray(allowedOrigins)) {
        throw (new Error('allowedOrigins must be Array<string>'));
    }

    for (const origin of allowedOrigins) {
        if (!TypeChecker.isString(origin)) {
            throw (new Error('origin must be string'));
        }
    }

    if (headers === undefined) {
        headers = '';
    }

    if (!TypeChecker.isString(headers)) {
        throw (new Error('headers must be String'));
    }

    if (methods === undefined) {
        methods = '';
    }

    if (!TypeChecker.isString(methods)) {
        throw (new Error('methods must be String'));
    }

    if (credentials) {
        _credentials = true;
    } else {
        _credentials = false;
    }

    if (headers.length !== 0) {
        _headers = headers;
    }
    if (methods.length !== 0) {
        _methods = methods;
    }
    if (allowedOrigins.length !== 0) {
        _allowedOrigins = [...allowedOrigins];
    }

    const setHeader = (req, res, next) => {
        if (req.headers === undefined) {
            throw (new Error('The first parameter must be request.'));
        }

        if (res.status === undefined) {
            throw (new Error('The second parameter must be response.'));
        }

        if (req.headers.origin !== undefined) {
            let num = 0;

            for (const allowedOrigin of _allowedOrigins) {
                if (allowedOrigin.includes(req.headers.origin)) {
                    break;
                }
            }

            if (num === _allowedOrigins.length) {
                return res.status(400).send(`Not accepted origin ${req.headers.origin}`);
            }

            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }

        if (_headers !== null) {
            res.header('Access-Control-Allow-Headers', _headers);

        }
        if (_methods !== null) {
            res.header('Access-Control-Allow-Methods', _methods);
        }
        if (_credentials) {
            res.header('Access-Control-Allow-Credentials', true);
        } else {
            res.header('Access-Control-Allow-Credentials', false);
        }

        if (req.method === "OPTIONS") {
            return res.status(200).send("OK");
        }

        next();
    }

    return setHeader;
};

export default myCors;