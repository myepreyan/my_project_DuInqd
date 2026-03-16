import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({ 
  images, 
  onImagesChange, 
  maxFiles = 5 
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = [...images, ...acceptedFiles].slice(0, maxFiles);
    onImagesChange(newImages);
  }, [images, maxFiles, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - images.length,
    disabled: images.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
        {images.map((file, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border border-gray-300 dark:border-zinc-700"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
        
        {images.length < maxFiles && (
          <div
            {...getRootProps()}
            className={`
              aspect-square rounded-lg border-2 border-dashed
              flex items-center justify-center cursor-pointer
              transition-colors
              ${isDragActive 
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-950/20' 
                : 'border-gray-300 dark:border-zinc-700 hover:border-lime-500 dark:hover:border-lime-500'
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <svg
                className="mx-auto h-8 w-8 text-gray-400 dark:text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-zinc-500">
        Ավելացրեք մինչև {maxFiles} նկար ({images.length}/{maxFiles})
      </p>
    </div>
  );
}
