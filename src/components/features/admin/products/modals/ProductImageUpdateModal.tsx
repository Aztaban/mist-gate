import { useUpdateProductImageMutation } from '@features/apiSlices/productApiSlice';
import { getImageUrl } from '@utils/images';
import ModalButtons from '../../../auth/modals/ModalButtons';
import { useImageUpload } from '@hooks/ui/useUploadImage';

interface ImageUpdateModalProps {
  productId: string;
  currentImage: string;
  onClose: () => void;
}

const ProductImageUpdateModal = ({ productId, currentImage, onClose }: ImageUpdateModalProps) => {
  const {
    selectedFile,
    previewUrl,
    error: imageError,
    handleFileChange,
    reset,
  } = useImageUpload({ maxSizeMb: 2, minWidth: 300, minHeight: 300 });

  const [updatedProductImage, { error }] = useUpdateProductImageMutation();

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      await updatedProductImage({
        id: productId,
        image: selectedFile,
      }).unwrap();
      reset();
      onClose();
    } catch (err) {
      console.error(imageError || 'Failed to update product image.');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Product Image</h2>
        <div>
          <img src={previewUrl || getImageUrl(currentImage)} alt="Product Image" />
        </div>
        <p>
          Recommended resolution: at least <strong>300×300px</strong>. Maximum size: <strong>2MB</strong>.
        </p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imageError && <p className="error">{imageError}</p>}
        <ModalButtons handleSubmit={handleUpload} onClose={handleClose} />
        {error && <p className="error">Error updating image.</p>}
      </div>
    </div>
  );
};

export default ProductImageUpdateModal;
