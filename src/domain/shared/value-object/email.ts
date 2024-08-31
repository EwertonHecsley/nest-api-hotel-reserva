export default class Email {
    private constructor(readonly value: string) {
        this.value = value;
    }

    static create(email: string) {
        return new Email(email);
    }

    validate(): Boolean {
        return !!this.value
            .toLowerCase()
            .match(
                /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(?:[a-zA-Z]{2,})$/
            )
    }

}