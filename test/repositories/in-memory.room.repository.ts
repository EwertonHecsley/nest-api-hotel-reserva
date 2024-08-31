import Room from "../../src/domain/employee/entities/room.entity";
import { RoomRepository } from "../../src/domain/employee/repositories/room.repository";

export class InMemoryRoomRepository implements RoomRepository {
    itens: Room[] = [];

    async create(room: Room): Promise<Room> {
        await this.itens.push(room);

        return room;
    }

    async findMany(): Promise<Room[]> {
        return await this.itens
    }

    async findById(id: string): Promise<Room | null> {
        const room = await this.itens.find((item) => item.id.getString() === id);

        if (!room) {
            return null;
        }

        return room;
    }

    async save(room: Room): Promise<void> {
        const itemIndex = await this.itens.findIndex(item => item.id == room.id);

        this.itens[itemIndex] = room;
    }
}