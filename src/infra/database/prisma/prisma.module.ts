import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { EmployeeRepository } from "@/domain/booking/repositories/employee.repository";
import { EmployeePrismaRepository } from "../repositories/employee.prisma.repository";
import { RoomRepository } from "@/domain/employee/repositories/room.repository";
import { RoomPrismaRepository } from "../repositories/room.prisma.repository";

@Module({
    providers: [
        PrismaService,
        { provide: EmployeeRepository, useClass: EmployeePrismaRepository, },
        { provide: RoomRepository, useClass: RoomPrismaRepository }
    ],
    exports: [PrismaService, EmployeeRepository, RoomRepository]
})
export class PrismaModule { }