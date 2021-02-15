class Error {
    constructor(code, message, req) {
        this.code = code;
        this.message = message;
        this.path = req.originalUrl;
    }
    toString() {
        return `ERROR (${this.code}): ${this.message} ||| PATH: ${this.path}`
    }
}

module.exports = Error;
