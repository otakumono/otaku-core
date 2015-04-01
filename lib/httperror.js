var xport = require('node-xport')(module)
  , Datatype = require('./datatype')
  ;

function createError(code, message) {
    code = (Datatype.asNumber(code) || 400);
    message = (message || 'Bad request.');
    
    function HTTPError() {}

    HTTPError.prototype.handle = function(request, response, next) {
        if (response.body) {
            return next();
        }

        response.type('application/json');
        response.status(code).send({ 'status': code, 'message': message });
    };

    return new HTTPError();
}



xport(createError);