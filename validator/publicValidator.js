const Error = require('../error/Error');
const errorHandler = require('../error/errorHandler');
const validatorHelpers = require('./validatorHelpers');

// Check addBin request validity
module.exports.addBinValidator = (req, res, next) => {
    const bin = req.body.json();
    if (!bin.latitude || !bin.longitude || !bin.type
    || !bin.color) {
        errorHandler.APIerror(new Error(400, 'form has insufficient data', req), req, res);
    } else if (!validatorHelpers.isValidCoordinates(bin.latitude, bin.longitude)) {
        errorHandler.APIerror(new Error(400, 'form contains invalid coordinates', req), req, res);
    } else {
        next();
    }
}

module.exports.findBinValidator = (req, res, next) => {
    const query = req.query
    if(!query.lat || !query.long) {
        errorHandler.APIerror(new Error(400, 'insufficient query parameters', req), req, res);
    } else if (!validatorHelpers.isValidCoordinates(query.lat, query.long)) {
        errorHandler.APIerror(new Error(400, 'invalid goordinate query parameters', req), req, res);
    } else {
        next();
    }
}