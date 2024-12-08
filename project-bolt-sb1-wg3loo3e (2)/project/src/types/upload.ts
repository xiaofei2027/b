export interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  retryCount: number;
}

export interface UploadResponse {
  url: string;
  fileId: string;
}

export interface UploadStore {
  uploadState: UploadState;
  setUploadProgress: (progress: number) => void;
  setUploadStatus: (status: UploadState['status'], error?: string) => void;
  resetUpload: () => void;
  incrementRetry: () => void;
}

export interface UploadConfig {
  maxRetries: number;
  retryDelay: number;
}