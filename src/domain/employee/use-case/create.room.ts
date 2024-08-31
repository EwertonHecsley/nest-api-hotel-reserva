import Money from "../../shared/value-object/money";
import Room from "../entities/room.entity";
import { RoomRepository } from "../repositories/room.repository";

type Request = {
    name: string;
    price: number;
    image: string;
    hasWifi?: boolean;
    hasAir?: boolean;
    hasKitchen?: boolean;
    isPetFriendly?: boolean;
    isAvailable?: boolean;
}

export class CreateRoomUseCase {

    constructor(private roomRepository: RoomRepository) { }

    async handler(data: Request) {
        const price = Money.create(data.price);
        const room = Room.create({ ...data, price });
        await this.roomRepository.create(room);

        return room;
    }
}