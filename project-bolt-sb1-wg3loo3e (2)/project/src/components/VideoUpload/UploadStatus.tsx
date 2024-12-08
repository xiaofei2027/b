import React from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface UploadStatusProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
  retryCount?: number;
  maxRetries?: number;
  onRetry?: () => void;
}

const UploadStatus: React.FC<UploadStatusProps> = ({ 
  status, 
  errorMessage,
  retryCount = 0,
  maxRetries = 0,
  onRetry 
}) => {
  if (status === 'idle') return null;

  const statusConfig = {
    uploading: {
      message: '正在上传视频...',
      className: 'text-blue-600 bg-blue-50',
      icon: null
    },
    success: {
      message: '视频上传成功！',
      className: 'text-green-600 bg-green-50',
      icon: CheckCircleIcon
    },
    error: {
      message: `上传失败: ${errorMessage || '发生未知错误'}`,
      className: 'text-red-600 bg-red-50',
      icon: XCircleIcon
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const canRetry = status === 'error' && retryCount < maxRetries;

  return (
    <div className="space-y-2">
      <div className={classNames(
        'rounded-lg p-2 flex items-center space-x-2',
        config.className
      )}>
        {StatusIcon && <StatusIcon className="w-3.5 h-3.5 flex-shrink-0" />}
        <span className="text-xs">{config.message}</span>
      </div>
      
      {canRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
        >
          <ArrowPathIcon className="w-3.5 h-3.5 mr-1" />
          重试上传 ({retryCount}/{maxRetries})
        </button>
      )}
    </div>
  );
};

export default UploadStatus;