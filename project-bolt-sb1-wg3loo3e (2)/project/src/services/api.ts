import axios, { AxiosError } from 'axios';
import { UploadResponse, UploadConfig } from '../types/upload';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadVideo = async (
  file: File,
  onUploadProgress?: (progress: number) => void,
  config: UploadConfig,
  retryCount: number = 0
): Promise<UploadResponse> => {
  try {
    console.log('Starting upload for file:', file.name);
    const formData = new FormData();
    formData.append('video', file);

    const { data } = await api.post<UploadResponse>('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Upload progress:', progress);
          onUploadProgress?.(progress);
        }
      },
    });

    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    
    if (retryCount < config.maxRetries) {
      console.log(`Retrying upload... Attempt ${retryCount + 1} of ${config.maxRetries}`);
      await delay(config.retryDelay);
      return uploadVideo(file, onUploadProgress, config, retryCount + 1);
    }

    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('上传超时，请检查网络连接');
      }
      if (!error.response) {
        throw new Error('网络错误，请检查网络连接');
      }
      throw new Error(error.response.data?.message || '上传失败');
    }
    
    throw error;
  }
};