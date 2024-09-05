import { HashRepository } from "@/domain/employee/services/hash.repository";
import { Injectable } from "@nestjs/common";
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService implements HashRepository {
    async hash(value: string): Promise<string> {
        return await hash(value, 10);
    }

    async compare(pass: string, hash: string): Promise<boolean> {
        return compare(pass, hash);
    }

}