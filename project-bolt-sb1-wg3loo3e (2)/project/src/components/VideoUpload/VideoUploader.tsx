import React from 'react';
import { useUploader } from '../../hooks/useUploader';
import VideoDropzone from './VideoDropzone';
import FileInfo from './FileInfo';
import ProgressBar from './ProgressBar';
import UploadStatus from './UploadStatus';
import { uploadConfig } from '../../config/upload';

const VideoUploader = () => {
  const {
    file,
    uploadState,
    handleFileAccepted,
    handleUpload,
    handleRetry,
    handleRemove
  } = useUploader();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            视频上传
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            支持拖拽或点击上传，最大支持 500MB 的视频文件
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          {!file && (
            <VideoDropzone
              onFileAccepted={handleFileAccepted}
              maxSize={500 * 1024 * 1024}
            />
          )}

          {file && (
            <div className="space-y-6">
              <FileInfo
                file={file}
                onRemove={handleRemove}
              />
              
              {uploadState.status === 'uploading' && (
                <ProgressBar progress={uploadState.progress} />
              )}

              <UploadStatus
                status={uploadState.status}
                errorMessage={uploadState.error}
                retryCount={uploadState.retryCount}
                maxRetries={uploadConfig.maxRetries}
                onRetry={handleRetry}
              />

              {uploadState.status === 'idle' && (
                <button
                  onClick={handleUpload}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  开始上传
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;