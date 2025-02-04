import { Product } from '../../../features/shop/productApiSlice';
import { getImageUrl } from '../../../utils/utils';
import { eurFormat } from '../../../utils/utils';

interface AdminProductDetailProps {
  product: Product;
}

const AdminProductDetail = ({
  product,
}: AdminProductDetailProps): JSX.Element => {
  return (
    <div className="admin-product-detail">
      <div className="product-info">
        <label>Product Name:</label>
        <p>{product.name}</p>
        <label>Product Type:</label>
        <p>{product.productType}</p>
        <label className='description-label'>Description:</label>
        <p>{product.details.description}</p>
        <label>Author:</label>
        <p>{product.details.author}</p>
        <label>Release Date:</label>
        <p>{product.details.releaseDate}</p>
      </div>
      <div className="image-container">
        <img src={getImageUrl(product.image)} alt={product.name} />
        <button className="btn save-btn">Change Image</button>
      </div>
      <div className="product-pricing">
        <div className="info-group">
          <label>Price:</label>
          <p>{eurFormat(product.price)}</p>
          <label>In Stock:</label>
          <p>{product.countInStock}</p>
          <label>Items sold:</label>
          <p>{product.unitsSold}</p>
        </div>
        <button className="btn save-btn">Change price</button>
        <button className="btn save-btn">Restock</button>
      </div>
    </div>
  );
};

export default AdminProductDetail;
