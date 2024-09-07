import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadRepository } from "@/domain/upload/repositories/upload.repository";
import { UploadS3Repository } from "./repository/uploud.s3.repository";

@Module({
    providers: [UploadService, { provide: UploadRepository, useClass: UploadS3Repository }],
    exports: [UploadService, UploadRepository]
})

export class UploadModule { }