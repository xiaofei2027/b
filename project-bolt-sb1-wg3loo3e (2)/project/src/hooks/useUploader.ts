import { useState, useCallback } from 'react';
import { useUploadStore } from '../store/uploadStore';
import { createUploadService } from '../services/uploadService';
import { uploadConfig } from '../config/upload';

export const useUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const { 
    uploadState, 
    setUploadProgress, 
    setUploadStatus, 
    resetUpload,
    incrementRetry 
  } = useUploadStore();

  const uploadService = createUploadService(uploadConfig);

  const handleFileAccepted = useCallback((acceptedFile: File) => {
    setFile(acceptedFile);
    resetUpload();
  }, [resetUpload]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    try {
      setUploadStatus('uploading');
      await uploadService.upload(file, setUploadProgress);
      setUploadStatus('success');
    } catch (error) {
      incrementRetry();
      setUploadStatus('error', error instanceof Error ? error.message : '上传失败');
    }
  }, [file, setUploadProgress, setUploadStatus, incrementRetry]);

  const handleRetry = useCallback(() => {
    if (uploadState.retryCount < uploadConfig.maxRetries) {
      handleUpload();
    }
  }, [uploadState.retryCount, handleUpload]);

  const handleRemove = useCallback(() => {
    setFile(null);
    resetUpload();
  }, [resetUpload]);

  return {
    file,
    uploadState,
    handleFileAccepted,
    handleUpload,
    handleRetry,
    handleRemove
  };
};