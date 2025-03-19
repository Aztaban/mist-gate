import { useState } from 'react';
import { useUpdateProductImageMutation } from '@features/apiSlices/productApiSlice';
import { getImageUrl } from '@utils/images';
import ModalButtons from '../../../auth/modals/ModalButtons';

interface ImageUpdateModalProps {
  productId: string;
  currentImage: string;
  onClose: () => void;
}

const ProductImageUpdateModal = ({
  productId,
  currentImage,
  onClose,
}: ImageUpdateModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [updatedProductImage, { isLoading, error }] =
    useUpdateProductImageMutation();

  console.log(productId);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      console.log(productId);
      await updatedProductImage({
        id: productId,
        image: selectedFile,
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to update product image:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Product Image</h2>
        <div>
          <img src={preview || getImageUrl(currentImage)} alt="Product Image" />
        </div>
        <input type="file" accept="image/*" onChange={handleFieldChange} />
        <ModalButtons handleSubmit={handleUpload} onClose={onClose} />
        {error && <p className="text-red-500 mt-2">Error updating image.</p>}
      </div>
    </div>
  );
};

export default ProductImageUpdateModal;
