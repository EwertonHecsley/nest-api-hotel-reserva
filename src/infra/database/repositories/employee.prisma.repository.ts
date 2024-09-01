import { EmployeeRepository } from "@/domain/booking/repositories/employee.repository";
import { Employee } from "@/domain/employee/entities/employee.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EmployeePrismaMapper } from "../prisma/mappers/employee.prisma.mapper";

@Injectable()
export class EmployeePrismaRepository implements EmployeeRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async create(dataEmployee: Employee): Promise<Employee> {
        const data = EmployeePrismaMapper.toDatabase(dataEmployee);

        const employee = await this.prismaService.employee.create({
            data
        });

        return EmployeePrismaMapper.toDomain(employee);
    }

    async findMany(): Promise<Employee[]> {
        const employees = await this.prismaService.employee.findMany();

        return employees.map(EmployeePrismaMapper.toDomain);
    }

    async findById(id: string): Promise<Employee | null> {
        const employee = await this.prismaService.employee.findFirst({
            where: {
                id
            }
        })

        if (!employee) {
            return null
        }

        return EmployeePrismaMapper.toDomain(employee);
    }

    async findByEmail(email: string): Promise<Employee | null> {
        const employee = await this.prismaService.employee.findFirst({
            where: {
                email
            }
        })

        if (!employee) {
            return null;
        }

        return EmployeePrismaMapper.toDomain(employee);
    }

    cancel(employee: Employee): Promise<void> {
        throw new Error("Method not implemented.");
    }

}