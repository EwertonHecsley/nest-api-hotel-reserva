import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory.room.repository";
import Money from "../../shared/value-object/money";
import Room from "../entities/room.entity";
import { GetRoomUseCase } from "./get.room";

let roomRepository: InMemoryRoomRepository;
let useCase: GetRoomUseCase;

describe('Listagem de quartos', () => {
    beforeEach(() => {
        roomRepository = new InMemoryRoomRepository();
        useCase = new GetRoomUseCase(roomRepository);
    })

    test('Deve retornar um quartos pelo o Id', async () => {
        const room = Room.create({
            name: 'Quarto Teste',
            price: Money.create(140000),
            image: 'image.jpeg'
        })

        roomRepository.itens.push(room);

        const response = await useCase.handler({
            id: room.id.getString()
        });

        expect(response.isRigth()).toBeTruthy();

    });

    test('Ao passar um ID inválido, deve retornar nulo', async () => {
        const response = await useCase.handler({
            id: '100'
        });

        expect(response.isLeft()).toBeTruthy();

    });
})
