import { GenericBaseErrors } from "../generic.base.errors";

export class NotAllowadError extends GenericBaseErrors {
    constructor() {
        super('Not Allowed');
    }
}