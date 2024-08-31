import { GenericBaseErrors } from "../generic.base.errors";

export class InvalidEmailError extends GenericBaseErrors {
    constructor() {
        super('Invalid Email');
    }
}