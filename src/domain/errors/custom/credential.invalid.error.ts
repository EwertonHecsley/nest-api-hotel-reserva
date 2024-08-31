import { GenericBaseErrors } from "../generic.base.errors";

export class CredentialsInvalidError extends GenericBaseErrors {
    constructor() {
        super('Credential Invalid');
    }
}