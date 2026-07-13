import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
  private minioClient: Minio.Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private configService: ConfigService) {
    const minioConfig = this.configService.get('minio');
    
    this.minioClient = new Minio.Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: minioConfig.useSSL,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey,
    });

    this.bucket = minioConfig.bucket;
    this.publicUrl = this.configService.get('MINIO_PUBLIC_URL') || `http://${minioConfig.endPoint}:${minioConfig.port}`;
    
    this.ensureBucket();
  }

  /**
   * Ensure bucket exists
   */
  private async ensureBucket() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucket);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucket, 'us-east-1');
        
        // Set bucket policy to public read
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucket}/*`],
            },
          ],
        };
        await this.minioClient.setBucketPolicy(this.bucket, JSON.stringify(policy));
      }
    } catch (error) {
      console.error('MinIO bucket initialization error:', error);
    }
  }

  /**
   * Upload single file
   */
  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    try {
      // Validate file
      if (!file) {
        throw new BadRequestException('فایلی برای آپلود انتخاب نشده است');
      }

      // Generate unique filename
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      const objectName = `${folder}/${filename}`;

      // Upload to MinIO
      await this.minioClient.putObject(
        this.bucket,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        }
      );

      // Return public URL
      return `${this.publicUrl}/${this.bucket}/${objectName}`;
    } catch (error) {
      console.error('MinIO upload error:', error);
      throw new InternalServerErrorException('خطا در آپلود فایل');
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(files: Express.Multer.File[], folder: string = 'uploads'): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, folder));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('MinIO multiple upload error:', error);
      throw new InternalServerErrorException('خطا در آپلود فایل‌ها');
    }
  }

  /**
   * Delete file
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract object name from URL
      const urlParts = fileUrl.split('/');
      const bucketIndex = urlParts.indexOf(this.bucket);
      
      if (bucketIndex === -1) {
        throw new BadRequestException('آدرس فایل نامعتبر است');
      }

      const objectName = urlParts.slice(bucketIndex + 1).join('/');
      
      await this.minioClient.removeObject(this.bucket, objectName);
    } catch (error) {
      console.error('MinIO delete error:', error);
      throw new InternalServerErrorException('خطا در حذف فایل');
    }
  }

  /**
   * Delete multiple files
   */
  async deleteFiles(fileUrls: string[]): Promise<void> {
    try {
      const deletePromises = fileUrls.map(url => this.deleteFile(url));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('MinIO multiple delete error:', error);
      throw new InternalServerErrorException('خطا در حذف فایل‌ها');
    }
  }

  /**
   * Get file URL
   */
  async getFileUrl(objectName: string): Promise<string> {
    return `${this.publicUrl}/${this.bucket}/${objectName}`;
  }
}
