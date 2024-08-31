import { GenericBaseErrors } from "../generic.base.errors";

export class NotFoundError extends GenericBaseErrors {
    constructor() {
        super('Not Found')
    }
}