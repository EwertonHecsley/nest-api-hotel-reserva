import { Either, right } from "@/domain/errors/either/either";
import { UploadRepository } from "../repositories/upload.repository";
import { File } from "../entities/file.entity";

type Request = {
    name: string;
    type: string;
    content: Buffer;
}

type Response = Either<null, Record<'path', string>>

export class SaveFileUseCase {
    constructor(private uploadRepository: UploadRepository) { }

    async handler(data: Request): Promise<Response> {
        const upload = File.create(
            {
                name: data.name,
                content: data.content,
                type: data.type
            }
        )

        const uploadedFile = await this.uploadRepository.upload(upload);

        return right(uploadedFile);
    }
}