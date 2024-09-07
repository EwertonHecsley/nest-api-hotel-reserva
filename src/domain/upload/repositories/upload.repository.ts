import { File } from "../entities/file.entity";

export abstract class UploadRepository {
    abstract upload(file: File): Promise<Record<'path', string>>
}