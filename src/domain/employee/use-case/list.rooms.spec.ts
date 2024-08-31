import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory.room.repository";
import Money from "../../shared/value-object/money";
import Room from "../entities/room.entity";
import { ListRoomUseCase } from "./list.room";

let roomRepository: InMemoryRoomRepository;
let useCase: ListRoomUseCase;

describe('Listagem de quartos', () => {
    beforeEach(() => {
        roomRepository = new InMemoryRoomRepository();
        useCase = new ListRoomUseCase(roomRepository);
    })

    test('Deve retornar uma lista de quartos', async () => {
        const room = Room.create({
            name: 'Quarto Teste',
            price: Money.create(140000),
            image: 'image.jpeg'
        })

        roomRepository.itens.push(room);

        const response = await useCase.handler();

        expect(response.value).toHaveLength(1);

    });
})
