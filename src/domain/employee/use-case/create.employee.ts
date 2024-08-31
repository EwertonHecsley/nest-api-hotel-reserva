import { EmployeeRepository } from "../../booking/repositories/employee.repository";
import { InvalidEmailError } from "../../errors/custom/invalid.email.error";
import { NotAllowadError } from "../../errors/custom/not.allowad.error";
import { Either, left, right } from "../../errors/either/either";
import Email from "../../shared/value-object/email";
import Employee from "../entities/employee.entity";
import { HashRepository } from "../services/hash.repository";

type Request = {
    name: string;
    email: string;
    password: string;
}

type Response = Either<InvalidEmailError | NotAllowadError, Employee>

export class CreateRoomUseCase {

    constructor(
        private employeeRepository: EmployeeRepository,
        private hashRepository: HashRepository) { }

    async handler({ name, email, password }: Request): Promise<Response> {
        const emailExist = await this.employeeRepository.findByEmail(email);

        if (emailExist) {
            return left(new NotAllowadError());
        }

        const emailEmployee = Email.create(email);

        if (!emailEmployee.validate()) {
            return left(new InvalidEmailError());
        }

        const hashPassword = await this.hashRepository.hash(password);

        const employee = Employee.create({ name, email: emailEmployee, password: hashPassword });

        await this.employeeRepository.create(employee);

        return right(employee);
    }
}