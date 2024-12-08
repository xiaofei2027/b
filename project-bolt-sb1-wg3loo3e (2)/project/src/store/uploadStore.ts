import create from 'zustand';
import { UploadStore } from '../types/upload';

export const useUploadStore = create<UploadStore>((set) => ({
  uploadState: {
    status: 'idle',
    progress: 0,
    retryCount: 0,
  },
  setUploadProgress: (progress) =>
    set((state) => ({
      uploadState: { ...state.uploadState, progress },
    })),
  setUploadStatus: (status, error) =>
    set((state) => ({
      uploadState: { 
        ...state.uploadState,
        status, 
        progress: status === 'success' ? 100 : state.uploadState.progress,
        error 
      },
    })),
  resetUpload: () =>
    set(() => ({
      uploadState: { status: 'idle', progress: 0, retryCount: 0 },
    })),
  incrementRetry: () =>
    set((state) => ({
      uploadState: {
        ...state.uploadState,
        retryCount: state.uploadState.retryCount + 1,
      },
    })),
}));