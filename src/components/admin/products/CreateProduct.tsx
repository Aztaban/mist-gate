import { ChangeEvent, FormEvent, useState } from 'react';
import { useAddNewProductMutation } from '../../../features/shop/productApiSlice';
import { Product } from '../../../features/shop/productApiSlice';

const CreateProduct = () => {
  const [addNewProduct] = useAddNewProductMutation();
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    productType: '',
    price: 0,
    image: '',
    countInStock: 0,
    details: { author: '', releaseDate: '', description: '' },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addNewProduct(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to save the post', err.message);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
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
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image Path"
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
      </form>
    </section>
  );
};

export default CreateProduct;
