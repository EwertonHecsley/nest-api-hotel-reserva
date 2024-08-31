import { RoomRepository } from "../../employee/repositories/room.repository";
import { NotFoundError } from "../../errors/custom/notFound.error";
import { Either, left, right } from "../../errors/either/either";
import Booking from "../entities/booking.entity";
import { BookingRepository } from "../repositories/booking.repository";

type Request = {
    bookingId: string
}

type Response = Either<NotFoundError, Booking>

export class CancelBooking {
    constructor(
        private bookingRepository: BookingRepository,
        private roomRepository: RoomRepository) { }

    async handler({ bookingId }: Request): Promise<Response> {
        const bookingExist = await this.bookingRepository.findById(bookingId);

        if (!bookingExist) {
            return left(new NotFoundError());
        }

        bookingExist.isActive = false;

        await this.bookingRepository.cancel(bookingExist);

        const { room } = bookingExist;

        room.isAvailable = true;

        await this.roomRepository.save(room);

        return right(bookingExist);
    }
}