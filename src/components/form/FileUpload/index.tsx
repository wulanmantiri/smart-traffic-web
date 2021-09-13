import { AddImageIcon } from 'icons';
import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUploadProps } from './types';

const FileUpload: FC<FileUploadProps> = ({ onFileDrop }) => {
  const onDrop = (droppedFiles: Blob[]) => {
    const file = droppedFiles[0];
    onFileDrop(file);
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      className={`flex justify-center py-6 border-2 border-dashed rounded-md bg-white ${
        isDragActive ? 'border-primary-100' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-1 text-center">
        <AddImageIcon />
        <div className="flex justify-center py-1 px-4 shadow-sm text-sm font-medium rounded-sm text-white bg-primary hover:bg-primary-700 cursor-pointer">
          Upload an image
        </div>
        <p className="text-sm text-gray-600">or drag and drop</p>
        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
