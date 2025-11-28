import { FormEvent } from 'react';
import { useUpdateProductImageMutation } from '@features/apiSlices/productApiSlice';
import ModalButtons from '@components/features/auth/modals/ModalButtons';
import { useImageUpload } from '@hooks/ui/useUploadImage';

interface ImageUpdateModalProps {
  productId: string;
  currentImage: string;
  onClose: () => void;
}

const ProductImageUpdateModal = ({ productId, currentImage, onClose }: ImageUpdateModalProps) => {
  const { selectedFile, previewUrl, error: imageError, handleFileChange, reset } = useImageUpload();

  const [updateImage, { isLoading, error }] = useUpdateProductImageMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      await updateImage({
        id: productId,
        image: selectedFile,
      }).unwrap();
      handleClose();
    } catch (err) {
      console.error('Failed to update image:', err);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Change Image</h2>

        <form onSubmit={handleSubmit}>
          <div className="modal-image-grid">
            <div className="modal-image-pane">
              <p className="field-helper">Current image</p>
              <img src={currentImage} alt="Current product" />
            </div>

            <div className="modal-image-pane">
              <p className="field-helper">{previewUrl ? 'New image' : 'Preview'}</p>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <p className="product-editor__media-hint">Select an image to see a preview.</p>
              )}
            </div>
          </div>

          <p className="field-helper">
            Recommended resolution: at least <strong>300×300px</strong>. Maximum size: <strong>2MB</strong>.
          </p>

          <div className="form__field">
            <label htmlFor="image-upload">Upload image</label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {imageError && <p className="errMsg">{imageError}</p>}
          {error && <p className="errMsg">Error updating image.</p>}

          <ModalButtons onClose={handleClose} isSubmitting={isLoading} confirmLabel="Upload" />
        </form>
      </div>
    </div>
  );
};

export default ProductImageUpdateModal;
