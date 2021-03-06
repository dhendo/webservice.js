var ws = require('./webservice');

// creates a handler middleware, function(req, resp, next)
var createHandler = exports.createHandler = function(module, options) {
    var router = ws.createRouter(module, options || {});
    return function(request, response, next) {

        router.handle(request, request.body, function(result) {

            result.headers = result.headers || {};

            /*if(result && result.headers && !result.headers.contentType)
             {
             result.headers.contentType = contentType;
             }*/

            /*
             if (request.headers && typeof request.headers.accept === 'string'
             && request.headers.accept.search('text/html') > -1) {
             contentType = "text/html";
             }
             else {
             contentType = "application/json";
             }
             */

            if(result.status === 404 && next) {
                if(next.length > 1) {
                    return next(request, response, result);
                } else {
                    return next();
                }
            }

            response.writeHead(result.status, result.headers);
            response.end(result.body || null);

        });
    };
}