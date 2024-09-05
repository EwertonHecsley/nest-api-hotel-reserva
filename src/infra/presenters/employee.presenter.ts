import { Employee } from "@/domain/employee/entities/employee.entity";

export class EmployeePresenter {
    static toHTTP(entity: Employee) {
        return {
            id: entity.id.getString(),
            name: entity.name,
            email: entity.email.value
        }
    }
}