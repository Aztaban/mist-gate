import { MouseEvent, ChangeEvent, FormEvent, useState, useMemo } from 'react';
import {
  useAddNewProductMutation,
  useUploadImageMutation,
} from '@features/apiSlices/productApiSlice';
import { Product } from '@types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '@features/slices/checkoutSlice';
import { productCategories } from '@config';
import { useImageUpload } from '@hooks/ui/useUploadImage';
import PriceInput from '@components/common/inputs/PriceInput';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const {
    selectedFile,
    previewUrl,
    error: imageError,
    handleFileChange,
    reset: resetImage,
  } = useImageUpload();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    productType: '',
    price: 0,
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });

  const canSave = useMemo(() => {
    return (
      [
        formData.name,
        formData.productType,
        Number.isInteger(formData.price),
        selectedFile,
        formData.details?.author,
        formData.details?.description,
      ].every(Boolean) && !isLoading
    );
  }, [formData, selectedFile, isLoading]);

  const handleGeneralChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      price: value, // Ensuring it's stored in cents
    }));
  };

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      countInStock: isNaN(intValue) || intValue < 0 ? 0 : intValue,
    }));
  };

  const handleDetailsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const detailKey = name.split('.')[1] as keyof Product['details'];

    setFormData((prev) => ({
      ...prev,
      details: {
        ...(prev.details ?? {}),
        [detailKey]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      const { image } = await uploadImage(selectedFile).unwrap();
      const finalData = { ...formData, image };
      await addNewProduct(finalData).unwrap();
      dispatch(clearCart());
      navigate('/admin/products');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to save the product: ', err.message);
      }
    }
  };

  const onBackBtnClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="admin-order">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="admin-order-form">
        <fieldset disabled={isLoading}>
          <legend>New Product</legend>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleGeneralChange}
            placeholder="Product Name"
          />
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            name="productType"
            onChange={handleGeneralChange}
            value={formData.productType}
          >
            <option value="">Select a product type</option>
            {productCategories.map((productType) => (
              <option key={productType} value={productType}>
                {productType}
              </option>
            ))}
          </select>
          <label htmlFor="price">Product Price:</label>
          <PriceInput
            value={formData.price || 0}
            onChange={handlePriceChange}
          />

          <label htmlFor="productType">Product Image:</label>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="admin-order-form-img"
            />
          ) : (
            <p>
              Recommended resolution: at least <strong>300×300px</strong>.
              Maximum size: <strong>2MB</strong>.
            </p>
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          {imageError && <div className="errMsg">{imageError}</div>}
          <label htmlFor="countInStock">Items in Stock:</label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleStockChange}
            placeholder="countInStock"
          />
        </fieldset>
        <fieldset disabled={isLoading}>
          <legend>Details</legend>
          <label htmlFor="details.author">Author:</label>
          <input
            type="text"
            id="details.author"
            name="details.author"
            value={formData.details?.author}
            onChange={handleDetailsChange}
            placeholder="Author"
          />
          <label htmlFor="details.releaseDate">Release Date:</label>
          <input
            type="date"
            id="details.releaseDate"
            name="details.releaseDate"
            value={formData.details?.releaseDate}
            onChange={handleDetailsChange}
          />
          <label htmlFor="details.description">Description:</label>
          <textarea
            id="details.description"
            name="details.description"
            value={formData.details?.description}
            onChange={handleDetailsChange}
            placeholder="Product Description"
            rows={6}
          />
        </fieldset>
        <div className="checkout-buttons">
          <button
            type="button"
            className="btn"
            onClick={onBackBtnClicked}
            disabled={isLoading}
          >
            back to products
          </button>
          <button
            type="submit"
            className="btn back-btn"
            disabled={!canSave}
            aria-disabled={!canSave}
          >
            {isLoading ? 'Loading...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
