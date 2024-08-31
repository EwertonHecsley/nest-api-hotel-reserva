import { NotFoundError } from "../../errors/custom/notFound.error";
import { Either, left, right } from "../../errors/either/either";
import Room from "../entities/room.entity";
import { RoomRepository } from "../repositories/room.repository";

type Request = {
    id: string;
}

type Response = Either<NotFoundError, Room>;

export class GetRoomUseCase {

    constructor(private roomRepository: RoomRepository) { }

    async handler({ id }: Request): Promise<Response> {
        const room = await this.roomRepository.findById(id);

        if (!room) {
            return left(new NotFoundError());
        }

        return right(room);
    }
}