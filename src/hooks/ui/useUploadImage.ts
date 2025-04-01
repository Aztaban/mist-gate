import { useState } from 'react';

interface UseImageUploadOptions {
  maxSizeMb?: number;
  minWidth?: number;
  minHeight?: number;
}

export const useImageUpload = ({
  maxSizeMb = 2,
  minWidth = 300,
  minHeight = 300,
}: UseImageUploadOptions = {}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Image size exceeds ${maxSizeMb}MB`);
      setSelectedFile(null);
      setPreviewUrl(null);
      URL.revokeObjectURL(objectUrl);
      return;
    }

    const img = new Image();

    img.src = objectUrl;

    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        setError(
          `Image dimensions must be at least ${minWidth}x${minHeight}px`
        );
        URL.revokeObjectURL(objectUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
      setError(null);
    };
    img.onerror = () => {
      setError('Invalid image file.');
    };
  };
  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  return { selectedFile, previewUrl, error, handleFileChange, reset };
};
