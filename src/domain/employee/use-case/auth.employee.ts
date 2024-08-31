import { EmployeeRepository } from "../../booking/repositories/employee.repository";
import { CredentialsInvalidError } from "../../errors/custom/credential.invalid.error";
import { NotFoundError } from "../../errors/custom/notFound.error";
import { Either, left, right } from "../../errors/either/either";
import Employee from "../entities/employee.entity";
import { HashRepository } from "../services/hash.repository";
import { TokenRepository } from "../services/token.repository";

type Request = {
    email: string;
    password: string;
}

type ResponseAuth = {
    employee: Employee;
    token: string;
}

type Response = Either<NotFoundError | CredentialsInvalidError, ResponseAuth>

export class AuthEmployee {
    constructor(
        private employeeRepository: EmployeeRepository,
        private hashRepository: HashRepository,
        private tokenRepository: TokenRepository
    ) { }

    async handler({ email, password }: Request): Promise<Response> {
        const employee = await this.employeeRepository.findByEmail(email);

        if (!employee) {
            return left(new NotFoundError());
        }

        const validPassword = await this.hashRepository.compare(password, employee.password);

        if (!validPassword) {
            return left(new CredentialsInvalidError());
        }

        const token = await this.tokenRepository.generate({ id: employee.id.getString(), email: employee.email.value, name: employee.name });

        return right({ employee, token });
    }
}