import Booking from "../entities/booking.entity";


export abstract class BookingRepository {
    abstract create(booking: Booking): Promise<Booking>;
    abstract findMany(): Promise<Booking[]>;
    abstract findById(id: string): Promise<Booking | null>;
    abstract cancel(booking: Booking): Promise<void>
}