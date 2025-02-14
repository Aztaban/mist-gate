import { MouseEvent, ChangeEvent, FormEvent, useState, useRef } from 'react';
import {
  useAddNewProductMutation,
  useUploadImageMutation,
} from '../../../features/shop/productApiSlice';
import { Product } from '../../../features/shop/productApiSlice';
import { useNavigate } from 'react-router-dom';
import { uploadImageAndGetPath } from '../../../hooks/useUploadImage';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../features/checkout/checkoutSlice';
import { productCategories } from '../../../config/productCategories';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    productType: '',
    price: 0,
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });
  const imageRef = useRef<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('file', file);
      imageRef.current = file;
      setPreviewUrl(URL.createObjectURL(file));
      console.log('image set', imageRef.current);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === 'price' || name === 'countInStock') {
        // Parse value as an integer
        const intValue = parseInt(value, 10);
        // Ignore invalid or empty values
        if (isNaN(intValue) || intValue < 0) {
          return prev;
        }
        return { ...prev, [name]: intValue };
      }

      if (name.startsWith('details.')) {
        const detailKey = name.split('.')[1] as keyof Product['details'];
        return {
          ...prev,
          details: {
            ...(prev.details ?? {
              author: '',
              releaseDate: '',
              description: '',
            }),
            [detailKey]: value,
          },
        };
      } else {
        if (name === 'productType') {
          setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const canSave =
    [
      formData.name,
      formData.productType && formData.productType !== '',
      formData.price,
      imageRef.current,
      formData.details?.author,
      formData.details?.description,
    ].every(Boolean) && !isLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const currentImage = imageRef.current;

    if (!currentImage) {
      alert('Please upload an image.');
      return;
    }

    if (
      !Number.isInteger(formData.price) ||
      !Number.isInteger(formData.countInStock)
    ) {
      alert('Price and Stock Count must be whole numbers.');
      return;
    }

    try {
      if (canSave) {
        const image = await uploadImageAndGetPath(currentImage, uploadImage);
        console.log('Image uploaded: ', image);

        const updatedFormData = {
          ...formData,
          image,
        };

        await addNewProduct(updatedFormData).unwrap();
        dispatch(clearCart());
        navigate('/admin/products');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to save the post', err.message);
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
            onChange={handleChange}
            placeholder="Product Name"
          />
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            name="productType"
            onChange={handleChange}
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
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <label htmlFor="productType">Product Image:</label>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="admin-order-form-img"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="countInStock">Items in Stock:</label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Author"
          />
          <label htmlFor="details.releaseDate">Release Date:</label>
          <input
            type="date"
            id="details.releaseDate"
            name="details.releaseDate"
            value={formData.details?.releaseDate}
            onChange={handleChange}
          />
          <label htmlFor="details.description">Description:</label>
          <textarea
            id="details.description"
            name="details.description"
            value={formData.details?.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={6}
          />
        </fieldset>
        <div className='checkout-buttons'>
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
