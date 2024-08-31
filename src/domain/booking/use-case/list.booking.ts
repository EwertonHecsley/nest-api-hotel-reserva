import { Either, right } from "../../errors/either/either";
import Booking from "../entities/booking.entity";
import { BookingRepository } from "../repositories/booking.repository";

type Response = Either<null, Booking[]>

export class ListBooking {
    constructor(private bookingRepository: BookingRepository) { }

    async handler(): Promise<Response> {
        const bookingList = await this.bookingRepository.findMany();

        return right(bookingList);
    }
}