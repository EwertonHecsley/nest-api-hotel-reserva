import { Employee } from '../../../../domain/employee/entities/employee.entity';
import { Employee as EmployeeDatabase } from '@prisma/client';
import Email from '../../../../domain/shared/value-object/email';
import Identity from '../../../../utils/entities/generic.identity';

export class EmployeePrismaMapper {
    static toDomain(entity: EmployeeDatabase): Employee {
        return Employee.create(
            {
                name: entity.name,
                email: Email.create(entity.email),
                password: entity.password
            },
            new Identity(entity.id)
        )
    }

    static toDatabase(entity: Employee): EmployeeDatabase {
        return {
            id: entity.id.getString(),
            name: entity.name,
            email: entity.email.value,
            password: entity.password
        }
    }
}