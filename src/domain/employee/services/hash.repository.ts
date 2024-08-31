export abstract class HashRepository {
    abstract hash(value: string): Promise<string>;
    abstract compare(pass: string, hash: string): Promise<boolean>;
}