import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export class UploadService extends S3 {
    constructor() {
        super(
            {
                credentials: {
                    accessKeyId: "",
                    secretAccessKey: ""
                },
                region: '',
                endpoint: ''
            }
        )
    }

    async uploadFile(name: string, type: string, buffer: Buffer) {
        const file = new Upload(
            {
                client: this,
                params: {
                    Bucket: '',
                    Key: `uploads/${name}`,
                    Body: buffer,
                    ContentType: type,
                    ACL: 'public-read'
                }
            }
        )

        const uploadedFile = await file.done();

        return uploadedFile.Location;
    }
}