import { randomUUID } from 'node:crypto'

export default class Identity {
    private value: string;

    constructor(value?: string) {
        this.value = value ?? randomUUID().toString();
    }

    getString() {
        return this.value;
    }
}