const Error = require('./Error');

module.exports.APIerror = (err, req, res, next) => {
    // Temporary logging mechanism, later proper logging core will be used
    if (err instanceof Error) {
        console.log(err)
        res.status(err.code).json(err.toString());
    } else {
        // generic 400 error
        const error = new Error(400, 'unknown error', req);
        onsole.log(error);
        res.status(error.code).json(error.toString());
    }
}

module.exports.generic404 = (err, req, res, next) => {
    const error = new Error(404, 'resource not found', req);
    res.status(404).json(error.toString);
}