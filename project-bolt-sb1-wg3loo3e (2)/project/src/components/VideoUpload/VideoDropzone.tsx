import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '../../utils/fileUtils';
import classNames from 'classnames';

interface VideoDropzoneProps {
  onFileAccepted: (file: File) => void;
  maxSize: number;
}

const VideoDropzone: React.FC<VideoDropzoneProps> = ({ onFileAccepted, maxSize }) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxSize: maxSize,
    multiple: false,
    onDropAccepted: (files) => onFileAccepted(files[0])
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={classNames(
          'border-2 border-dashed rounded-lg p-8',
          'flex flex-col items-center justify-center space-y-2',
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        )}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className={classNames(
          'w-4 h-4',
          isDragActive ? 'text-indigo-500' : 'text-gray-400'
        )} />
        
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            {isDragActive ? '松开鼠标上传文件' : '拖拽视频文件到这里'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            或点击选择文件
          </p>
        </div>
        
        <p className="text-xs text-gray-400">
          支持的格式: MP4, MOV, AVI, MKV (最大 {formatFileSize(maxSize)})
        </p>
      </div>
      
      {fileRejections.length > 0 && (
        <div className="mt-2 p-2 bg-red-50 rounded-lg">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-xs text-red-600">
              {errors.map(error => (
                <p key={error.code}>{error.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoDropzone;