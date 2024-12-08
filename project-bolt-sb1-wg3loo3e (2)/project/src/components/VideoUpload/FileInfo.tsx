import React from 'react';
import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '../../utils/fileUtils';

interface FileInfoProps {
  file: File;
  onRemove: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({ file, onRemove }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <DocumentIcon className="w-3.5 h-3.5 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </h3>
              <p className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={onRemove}
              className="p-1 rounded-full hover:bg-gray-200"
              aria-label="移除文件"
            >
              <XMarkIcon className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;