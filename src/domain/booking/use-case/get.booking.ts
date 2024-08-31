import { NotFoundError } from "../../errors/custom/notFound.error";
import { Either, left, right } from "../../errors/either/either";
import Booking from "../entities/booking.entity";
import { BookingRepository } from "../repositories/booking.repository";

type Request = {
    id: string
}

type Response = Either<NotFoundError, Booking>

export class GetBooking {
    constructor(private bookingRepository: BookingRepository) { }

    async handler({ id }: Request): Promise<Response> {
        const booking = await this.bookingRepository.findById(id);

        if (!booking) {
            return left(new NotFoundError());
        }

        return right(booking);
    }
}