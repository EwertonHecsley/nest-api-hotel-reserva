import { EmployeeRepository } from "../../booking/repositories/employee.repository";
import Employee from "../entities/employee.entity";


type Response = {
    id: string;
}

export class GetEmployeeUseCase {

    constructor(private roomRepository: EmployeeRepository) { }

    async handler({ id }: Response): Promise<Employee | null> {
        return await this.roomRepository.findById(id);
    }
}