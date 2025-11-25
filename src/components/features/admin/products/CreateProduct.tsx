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
    category: '',
    price: 0,
    image: '',
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });

  const canSave = useMemo(() => {
    return (
      !!formData.name?.trim() &&
      !!formData.category &&
      typeof formData.price === 'number' &&
      formData.price >= 0 &&
      !!formData.details?.author?.trim() &&
      !!selectedFile &&
      !isLoading
    );
  }, [formData, selectedFile, isLoading]);

  const handleGeneralChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        details: {
          author: formData.details?.author?.trim() ?? '',
          releaseDate: formData.details?.releaseDate || undefined,
          description: formData.details?.description || undefined,
        },
      };

      await addNewProduct(payload).unwrap();

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

  const onBackBtnClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="page-stack">
      <section className="surface-dark section product-editor">
        <header className="section-bar section-bar--sub">
          <h2 className="section-bar__title section-bar__title--sm">Add a New Product</h2>

          <button type="button" className="btn btn--ghost btn--sm" onClick={onBackBtnClicked} disabled={isLoading}>
            Back to products
          </button>
        </header>

        <form onSubmit={handleSubmit} className="product-editor__form">
          <div className="product-editor__grid">
            {/* LEFT: main info */}
            <div className="product-editor__col product-editor__col--main">
              <div className="product-editor__group">
                <h3 className="product-editor__group-title">Basics</h3>

                <div className="form__field">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleGeneralChange}
                    placeholder="Product name"
                    disabled={isLoading}
                  />
                </div>

                <div className="form__field">
                  <label htmlFor="category">Category</label>
                  {catsLoading ? (
                    <span>Loading categories…</span>
                  ) : catsError ? (
                    <span className="errMsg">Failed to load categories</span>
                  ) : (
                    <select
                      id="category"
                      name="category"
                      onChange={handleGeneralChange}
                      value={formData.category}
                      disabled={isLoading}>
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="form__field">
                  <label htmlFor="price">Price</label>
                  <PriceInput value={formData.price || 0} onChange={handlePriceChange} />
                </div>

                <div className="form__field">
                  <label htmlFor="countInStock">Items in Stock</label>
                  <input
                    type="number"
                    id="countInStock"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleStockChange}
                    min={0}
                    step={1}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="product-editor__group">
                <h3 className="product-editor__group-title">Details</h3>

                <div className="form__field">
                  <label htmlFor="details.author">Author</label>
                  <input
                    type="text"
                    id="details.author"
                    name="details.author"
                    value={formData.details?.author}
                    onChange={handleDetailsChange}
                    placeholder="Author"
                    disabled={isLoading}
                  />
                </div>

                <div className="form__field">
                  <label htmlFor="details.releaseDate">Release Date</label>
                  <input
                    type="date"
                    id="details.releaseDate"
                    name="details.releaseDate"
                    value={formData.details?.releaseDate}
                    onChange={handleDetailsChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form__field">
                  <label htmlFor="details.description">Description</label>
                  <textarea
                    id="details.description"
                    name="details.description"
                    value={formData.details?.description}
                    onChange={handleDetailsChange}
                    placeholder="Product description"
                    rows={6}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: image */}
            <aside className="product-editor__col product-editor__col--media">
              <h3 className="product-editor__group-title">Product Image</h3>

              <div className="product-editor__media">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" />
                ) : (
                  <p className="product-editor__media-hint">
                    Recommended resolution: <strong>at least 300×300px</strong>. Maximum size: <strong>2MB</strong>.
                  </p>
                )}
              </div>

              <div className="form__field">
                <label htmlFor="image">Upload image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={isLoading}
                />
              </div>

              {imageError && <p className="errMsg product-editor__error">{imageError}</p>}
            </aside>
          </div>

          <div className="product-editor__actions form__actions">
            <button type="button" className="btn btn--ghost" onClick={onBackBtnClicked} disabled={isLoading}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn--brand ${!canSave ? 'btn--disabled' : ''}`}
              disabled={!canSave}
              aria-disabled={!canSave}>
              {isLoading ? 'Saving…' : 'Create Product'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
