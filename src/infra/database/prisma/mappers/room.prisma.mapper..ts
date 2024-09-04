import { Room as RomDatabase } from '@prisma/client';
import Identity from '../../../../utils/entities/generic.identity';
import Room from '@/domain/employee/entities/room.entity';
import Money from '@/domain/shared/value-object/money';

export class RoomPrismaMapper {
    static toDomain(entity: RomDatabase): Room {
        return Room.create(
            {
                name: entity.name,
                price: Money.create(entity.price),
                image: entity.image,
                hasWifi: entity.hasWifi,
                hasAir: entity.hasAir,
                hasKitchen: entity.hasKitchen,
                isPetFriendly: entity.isPetFriendly,
                isAvailable: entity.isAvailable,
            },
            new Identity(entity.id)
        )
    }

    static toDatabase(entity: Room): RomDatabase {
        return {
            id: entity.id.getString(),
            name: entity.name,
            price: entity.price.value,
            image: entity.image,
            hasWifi: entity.hasWifi,
            hasAir: entity.hasAir,
            hasKitchen: entity.hasKitchen,
            isPetFriendly: entity.isPetFriendly,
            isAvailable: entity.isAvailable,
        }
    }
}