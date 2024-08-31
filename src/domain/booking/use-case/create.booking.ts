import { RoomRepository } from "../../employee/repositories/room.repository";
import { NotAllowadError } from "../../errors/custom/not.allowad.error";
import { NotFoundError } from "../../errors/custom/notFound.error";
import { Either, left, right } from "../../errors/either/either";
import Email from "../../shared/value-object/email";
import Booking from "../entities/booking.entity";
import { BookingRepository } from "../repositories/booking.repository";

type Request = {
    roomId: string;
    days: number;
    customer: string;
    email: string;
    isActive?: boolean

}

type Response = Either<NotFoundError | NotAllowadError, Booking>

export class CreateBooking {
    constructor(
        private roomRepositoy: RoomRepository,
        private bookingRepository: BookingRepository
    ) { }

    async handler({ customer, email, roomId, days }: Request): Promise<Response> {
        const roomExist = await this.roomRepositoy.findById(roomId);

        if (!roomExist) {
            return left(new NotFoundError());
        }

        if (!roomExist.isAvailable) {
            return left(new NotAllowadError());
        }

        const emailObject = Email.create(email);

        const booking = Booking.create({
            customer,
            days,
            email: emailObject,
            room: roomExist
        })

        await this.bookingRepository.create(booking);

        roomExist.isAvailable = false;

        await this.roomRepositoy.save(roomExist);

        return right(booking);
    }
}