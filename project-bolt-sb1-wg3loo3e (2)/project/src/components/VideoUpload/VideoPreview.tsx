import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '../../utils/fileUtils';

interface VideoPreviewProps {
  file: File;
  thumbnailUrl: string;
  onRemove: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ file, thumbnailUrl, onRemove }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start space-x-4">
        <div className="relative w-32 h-24 bg-black rounded overflow-hidden">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={onRemove}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;