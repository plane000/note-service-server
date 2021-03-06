import {API} from './API';

export class APIErrors extends API {
    constructor(res) {
        super()
        this.res = res;
        this.errors = {
            status: {
                error: true,
                code: undefined,
                type: undefined,
                message: undefined
            },
            error: {
                errors: []
            }
        }
    }

    addError(statusCode, message, verbose) {
        verbose = verbose || message;
        this.errors.error.errors.push({status: statusCode, title: message, detail: verbose});
        this.errors.status.code = statusCode;
        this.errors.status.type = message;
        this.errors.status.message = message;
    }

    count() { return this.errors.error.errors.length }

    endpoint() {
        this.res
            .status(this.errors.status.code)
            .end(JSON.stringify(this.errors, false, 4));
    }
}
