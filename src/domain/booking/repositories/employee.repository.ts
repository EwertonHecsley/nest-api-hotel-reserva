import Employee from "../../employee/entities/employee.entity";

export abstract class EmployeeRepository {
    abstract create(employee: Employee): Promise<Employee>;
    abstract findMany(): Promise<Employee[]>;
    abstract findById(id: string): Promise<Employee | null>;
    abstract findByEmail(email: string): Promise<Employee | null>
    abstract cancel(employee: Employee): Promise<void>
}