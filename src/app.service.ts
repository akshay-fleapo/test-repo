import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export class AppService {
  constructor(private storage: Storage) {
    const cred = {
      credentials: {
        private_key: process.env.GCP_PRIVATE_KEY,
        client_email: process.env.GCP_CLIENT_EMAIL
      },
      projectId: process.env.GCP_PROJECT_ID
    };
    if (process.env.GCP_PRIVATE_KEY) {
      this.storage = new Storage(cred);
    } else {
      this.storage = new Storage();
    }
  }

  getPing(): string {
    return 'pong';
  }

  async uploadFile(file: any) {
    try {
      const bucketName = process.env.PROFILE_BUCKET;

      const uuid = uuidv4();
      const extension = path.extname(file.originalname).substring(1);
      // const originalFileName = `${uuid}_original.${extension}`;
      const resizedFileName = `${uuid}_resized.${extension}`;

      //   await Promise.all([
      // await this.storage.bucket(bucketName).file(originalFileName).save(file.buffer, { public: true });
      await this.storage
        .bucket(bucketName)
        .file(resizedFileName)
        .save(await sharp(file.buffer).rotate().resize(500).toBuffer(), { public: true });
      // ]);
      const imageURL = `https://storage.googleapis.com/${bucketName}/${resizedFileName}`;
      // const originalImageURL = `https://storage.googleapis.com/${bucketName}/${originalFileName}`;
      return { imageURL };
    } catch (error) {}
  }
}
