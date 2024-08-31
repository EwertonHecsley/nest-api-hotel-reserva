import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory.room.repository";
import Identity from "../../../utils/entities/generic.identity";
import Money from "../../shared/value-object/money";
import { CreateRoomUseCase } from "./create.room";

let roomRepository: InMemoryRoomRepository;
let useCase: CreateRoomUseCase;

describe('Criação de quartos', () => {
    beforeEach(() => {
        roomRepository = new InMemoryRoomRepository();
        useCase = new CreateRoomUseCase(roomRepository);
    })

    test('Deve criar um quarto', async () => {
        const room = await useCase.handler({
            name: 'Quarto 1',
            price: 120000,
            image: 'image.jpeg'
        })

        expect(roomRepository.itens[0].price).toBeInstanceOf(Money);
        expect(roomRepository.itens[0].id).toBeInstanceOf(Identity);
        expect(roomRepository.itens[0].id.getString()).toEqual(room.id.getString());
        expect(roomRepository.itens[0].price.formattedPriceBRL()).toEqual('R$\u{a0}1.200,00');
        expect(roomRepository.itens[0].name).toEqual('Quarto 1');
        expect(roomRepository.itens[0].image).toEqual('image.jpeg');
        expect(roomRepository.itens[0].hasAir).toEqual(false);
        expect(roomRepository.itens[0].hasKitchen).toEqual(false);
        expect(roomRepository.itens[0].hasWifi).toEqual(false);
        expect(roomRepository.itens[0].isPetFriendly).toEqual(false);
        expect(roomRepository.itens[0].isAvailable).toEqual(true);

    });

    test('Deve alterar as propriedades de um quarto', async () => {
        const room = await useCase.handler({
            name: 'Quarto 1',
            price: 120000,
            image: 'image.jpeg'
        });

        room.name = 'Quarto 2'; // Usa o setter
        room.image = 'image2.jpeg'
        room.price = Money.create(140000);
        room.hasAir = true;
        room.hasKitchen = true;
        room.hasWifi = true;
        room.isPetFriendly = true;
        room.isAvailable = false;

        expect(roomRepository.itens[0].name).toEqual('Quarto 2');
        expect(roomRepository.itens[0].image).toBe('image2.jpeg');
        expect(roomRepository.itens[0].price.formattedPriceBRL()).toEqual('R$\u{a0}1.400,00');
        expect(roomRepository.itens[0].hasAir).toEqual(true);
        expect(roomRepository.itens[0].hasKitchen).toEqual(true);
        expect(roomRepository.itens[0].hasWifi).toEqual(true);
        expect(roomRepository.itens[0].isPetFriendly).toEqual(true);
        expect(roomRepository.itens[0].isAvailable).toEqual(false);
    });
})
