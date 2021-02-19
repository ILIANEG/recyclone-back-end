class Error {
    constructor(code, message, req) {
        this.code = code;
        this.message = message;
        this.path = req.originalUrl;
    }
    toString() {
        return `STATUS (${this.code}): ${this.message} ||| RESOURCE: ${this.path}`
    }
}

module.exports = Error;
