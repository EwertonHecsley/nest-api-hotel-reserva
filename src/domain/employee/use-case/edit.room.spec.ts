import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory.room.repository";
import Money from "../../shared/value-object/money";
import Room from "../entities/room.entity";
import { EditRoomUseCase } from "./edit.room";

let roomRepository: InMemoryRoomRepository;
let useCase: EditRoomUseCase;

describe('Edição de quartos', () => {
    beforeEach(() => {
        roomRepository = new InMemoryRoomRepository();
        useCase = new EditRoomUseCase(roomRepository);
    })

    test('Deve editar um quarto', async () => {
        const room = Room.create({
            name: 'Quarto Teste',
            price: Money.create(140000),
            image: 'image.jpeg'
        })

        roomRepository.itens.push(room);

        await useCase.handler({
            id: room.id.getString(),
            name: 'Quarto 100',
            price: 120000,
            image: room.image,
            hasAir: room.hasAir,
            hasKitchen: room.hasKitchen,
            hasWifi: room.hasWifi,
            isPetFriendly: room.isAvailable,
            isAvailable: room.isAvailable
        });

        expect(roomRepository.itens[0].name).toEqual('Quarto 100');

    });
})
