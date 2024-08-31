import Entity from '../../../utils/entities/generic.entity';
import Identity from '../../../utils/entities/generic.identity';
import Email from '../../shared/value-object/email';

type EmployeeType = {
    name: string;
    email: Email;
    password: string
}

export default class Employee extends Entity<EmployeeType> {

    static create(data: EmployeeType, id?: Identity) {
        return new Employee(data, id)
    }

    get name(): string {
        return this.attributes.name;
    }

    get email(): Email {
        return this.attributes.email;
    }

    get password(): string {
        return this.attributes.password;
    }

    set name(name: string) {
        this.attributes.name = name;
    }

    set email(email: Email) {
        this.attributes.email = email;
    }

    set password(password: string) {
        this.attributes.password = password;
    }
}