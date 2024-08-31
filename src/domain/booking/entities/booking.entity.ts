import Room from '../../employee/entities/room.entity';
import Entity from '../../../utils/entities/generic.entity';
import Identity from '../../../utils/entities/generic.identity';
import { Optional } from '../../../utils/types/opitional.type';
import Email from '../../shared/value-object/email';

type BookingType = {
    room: Room;
    days: number;
    customer: string;
    email: Email;
    isActive: boolean;
}

export default class Booking extends Entity<BookingType> {

    //Este partner utilizando um método estático, remove a necessidade da criacao de um CONSTRUTOR da classe
    static create(data: Optional<BookingType, 'isActive'>, id?: Identity) {
        return new Booking(
            {
                ...data,
                isActive: data.isActive ?? true
            },
            id
        );
    }

    get room(): Room {
        return this.attributes.room;
    }

    get days(): number {
        return this.attributes.days;
    }

    get customer(): string {
        return this.attributes.customer;
    }

    get email(): Email {
        return this.attributes.email;
    }

    get isActive(): boolean {
        return this.attributes.isActive;
    }

    set room(room: Room) {
        this.attributes.room = room;
    }

    set isActive(isActive: boolean) {
        this.attributes.isActive = isActive;
    }
}