import { HashRepository } from "@/domain/employee/services/hash.repository";
import { Module } from "@nestjs/common";
import { HashService } from "./hash.service";

@Module({
    providers: [
        {
            provide: HashRepository,
            useClass: HashService
        }
    ],
    exports: [HashRepository]
})
export class CryptoModule { }