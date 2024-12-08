import { uploadVideo } from './api';
import { UploadConfig } from '../types/upload';

export class UploadService {
  private config: UploadConfig;

  constructor(config: UploadConfig) {
    this.config = config;
  }

  async upload(
    file: File,
    onProgress?: (progress: number) => void
  ) {
    try {
      return await uploadVideo(file, onProgress, this.config);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`上传失败: ${error.message}`);
      }
      throw new Error('上传过程中发生未知错误');
    }
  }
}

export const createUploadService = (config: UploadConfig) => {
  return new UploadService(config);
};