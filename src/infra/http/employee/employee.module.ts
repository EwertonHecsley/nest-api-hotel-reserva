import { Module } from "@nestjs/common";
import { EmployeeController } from "./controllers/create.employee.controller";
import { CreateEmployeeUseCase } from "@/domain/employee/use-case/create.employee";
import { EmployeeRepository } from "@/domain/booking/repositories/employee.repository";
import { HashRepository } from "@/domain/employee/services/hash.repository";
import { CryptoModule } from "@/infra/crypto/cryoto.module";
import { DatabaseModule } from "@/infra/database/database.module";

@Module({
    imports: [CryptoModule, DatabaseModule],
    providers: [
        {
            provide: CreateEmployeeUseCase,
            useFactory: (
                employeeRepository: EmployeeRepository,
                hashRepository: HashRepository
            ) => {
                return new CreateEmployeeUseCase(employeeRepository, hashRepository);
            },
            inject: [EmployeeRepository, HashRepository]
        }
    ],
    controllers: [EmployeeController]
})
export class EmployeeModule { }