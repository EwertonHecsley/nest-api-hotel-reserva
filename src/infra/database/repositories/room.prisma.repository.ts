import { RoomRepository } from "@/domain/employee/repositories/room.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import Room from "@/domain/employee/entities/room.entity";
import { RoomPrismaMapper } from "../prisma/mappers/room.prisma.mapper.";



@Injectable()
export class RoomPrismaRepository implements RoomRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async create(dataRoom: Room): Promise<Room> {
        const data = RoomPrismaMapper.toDatabase(dataRoom);

        const room = await this.prismaService.room.create({
            data
        });

        return RoomPrismaMapper.toDomain(room);
    }

    async findMany(): Promise<Room[]> {
        const rooms = await this.prismaService.room.findMany();

        return rooms.map(RoomPrismaMapper.toDomain);
    }

    async findById(id: string): Promise<Room | null> {
        const room = await this.prismaService.room.findFirst({
            where: {
                id
            }
        })

        if (!room) {
            return null
        }

        return RoomPrismaMapper.toDomain(room);
    }

    cancel(room: Room): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async save(room: Room): Promise<void> {
        
    }

}