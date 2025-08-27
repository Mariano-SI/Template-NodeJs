import {
  UploaderProps,
  UploaderProvider,
} from '@/common/domain/providers/uploader.provider'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '../env'

export class CloudflareR2Uploader implements UploaderProvider {
  private readonly client: S3Client

  constructor() {
    this.client = new S3Client({
      endpoint: env.CLOUDFLARE_R2_URL,
      region: 'auto',
      credentials: {
        accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      },
    })
  }
  async upload(params: UploaderProps): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: params.fileName,
        ContentType: params.fileType,
        Body: params.fileContent,
      }),
    )

    const fileUrl = `${env.CLOUDFLARE_R2_DEV_SUBDOMAIN}/${params.fileName}`
    return fileUrl
  }
}
