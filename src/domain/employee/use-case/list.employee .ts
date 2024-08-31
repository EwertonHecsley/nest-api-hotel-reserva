import { EmployeeRepository } from "../../booking/repositories/employee.repository";
import Employee from "../entities/employee.entity";


export class ListEmployeeUseCase {

    constructor(private roomRepository: EmployeeRepository) { }

    async handler(): Promise<Employee[]> {
        return await this.roomRepository.findMany();
    }
}