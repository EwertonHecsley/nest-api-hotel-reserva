import { Either, right } from "../../errors/either/either";
import Room from "../entities/room.entity";
import { RoomRepository } from "../repositories/room.repository";

type Response = Either<null, Room[]>

export class ListRoomUseCase {

    constructor(private roomRepository: RoomRepository) { }

    async handler(): Promise<Response> {
        const listRooms = await this.roomRepository.findMany();

        return right(listRooms);
    }
}