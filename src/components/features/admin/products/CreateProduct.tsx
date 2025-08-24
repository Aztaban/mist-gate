import { MouseEvent, ChangeEvent, FormEvent, useState, useMemo } from 'react';
import { useAddNewProductMutation, useUploadImageMutation } from '@features/apiSlices/productApiSlice';
import { CreateProductPayload } from '@types';
import { useNavigate } from 'react-router-dom';
import { useImageUpload } from '@hooks/ui/useUploadImage';
import PriceInput from '@components/common/inputs/PriceInput';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: categories = [], isLoading: catsLoading, isError: catsError } = useGetCategoriesQuery();

  const { selectedFile, previewUrl, error: imageError, handleFileChange, reset: resetImage } = useImageUpload();

  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    category: '', // categoryId
    price: 0,
    image: '', // set after upload
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });

  const canSave = useMemo(() => {
    return (
      !!formData.name?.trim() &&
      !!formData.category && // category id
      typeof formData.price === 'number' &&
      formData.price >= 0 &&
      !!formData.details?.author?.trim() &&
      !!selectedFile && // require image file
      !isLoading
    );
  }, [formData, selectedFile, isLoading]);

  const handleGeneralChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category' ? value : value,
    }));
  };

  const handlePriceChange = (value: number) => {
    setFormData((prev) => ({ ...prev, price: value }));
  };

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      countInStock: isNaN(intValue) || intValue < 0 ? 0 : intValue,
    }));
  };

  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // name like "details.author"
    const key = name.split('.')[1] as keyof CreateProductPayload['details'];
    setFormData((prev) => ({
      ...prev,
      details: {
        ...(prev.details ?? { author: '' }),
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(categories);
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      // 1) upload image
      const { image } = await uploadImage(selectedFile).unwrap();

      // 2) create product
      const payload: CreateProductPayload = {
        ...formData,
        image,
        // normalize empty strings to undefined for optional fields
        details: {
          author: formData.details?.author?.trim() ?? '',
          releaseDate: formData.details?.releaseDate || undefined,
          description: formData.details?.description || undefined,
        },
      };
      console.log('Submitting payload:', payload.category, payload);
      await addNewProduct(payload).unwrap();
      // reset local UI
      resetImage();
      setFormData({
        name: '',
        category: '',
        price: 0,
        image: '',
        countInStock: 0,
        details: { author: '', releaseDate: '', description: '' },
      });

      navigate('/admin/products');
    } catch (err: any) {
      alert(err?.data?.message ?? 'Failed to save the product');
      console.error('Failed to save the product:', err);
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

          <label htmlFor="category">Category:</label>
          {catsLoading ? (
            <span>Loading categories…</span>
          ) : catsError ? (
            <span className="errMsg">Failed to load categories</span>
          ) : (
            <select id="category" name="category" onChange={handleGeneralChange} value={formData.category}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          <label htmlFor="price">Product Price:</label>
          <PriceInput value={formData.price || 0} onChange={handlePriceChange} />

          <label htmlFor="image">Product Image:</label>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="admin-order-form-img" />
          ) : (
            <p>
              Recommended resolution: at least <strong>300×300px</strong>. Maximum size: <strong>2MB</strong>.
            </p>
          )}
          <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" />
          {imageError && <div className="errMsg">{imageError}</div>}

          <label htmlFor="countInStock">Items in Stock:</label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleStockChange}
            placeholder="countInStock"
            min={0}
            step={1}
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
          <button type="button" className="btn" onClick={onBackBtnClicked} disabled={isLoading}>
            back to products
          </button>
          <button type="submit" className="btn back-btn" disabled={!canSave} aria-disabled={!canSave}>
            {isLoading ? 'Loading...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
