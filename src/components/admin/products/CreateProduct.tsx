import { MouseEvent, ChangeEvent, FormEvent, useState } from 'react';
import {
  useAddNewProductMutation,
  useUploadImageMutation,
} from '../../../features/shop/productApiSlice';
import { Product } from '../../../features/shop/productApiSlice';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    productType: '',
    price: 0,
    image: '',
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log('image set', image);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
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
      }
      return { ...prev, [name]: value };
    });
  };

  const canSave =
    [
      formData.name,
      formData.productType,
      formData.price,
      image,
      formData.details?.author,
      formData.details?.description,
    ].every(Boolean) && !isLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (canSave) {
        console.log('Uploading image');
        const { image: uploadedImagePath } = await uploadImage(
          image as File
        ).unwrap();
        console.log('Image uploaded: ', uploadedImagePath);

        setFormData((prev) => ({
          ...prev,
          image: uploadedImagePath,
        }));

        console.log('Sending Product');
        await addNewProduct(formData).unwrap();
        console.log('Product created:', formData);
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
    <section>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            placeholder="Product Type"
          />
          <label htmlFor="price">Product Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <label htmlFor="productType">Image Path:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {formData.image && <p>Image uploaded: {formData.image}</p>}
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
          <input
            type="text"
            id="details.description"
            name="details.description"
            value={formData.details?.description}
            onChange={handleChange}
            placeholder="Product Description"
          />
        </fieldset>
        <button
          type="submit"
          className="btn save-btn"
          disabled={!canSave}
          aria-disabled={!canSave}
        >
          {isLoading ? 'Loading...' : 'Create Product'}
        </button>
      </form>
      <button
        type="button"
        className="btn back-btn"
        onClick={onBackBtnClicked}
        disabled={isLoading}
      >
        back to products
      </button>
    </section>
  );
};

export default CreateProduct;
