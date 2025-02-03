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
    <>
      <div>
        <img src={getImageUrl(product.image)} alt={product.name} />
        <button>Change Image</button>
      </div>
      <div>
        <label>Product Name:</label>
        <p>{product.name}</p>
        <label>Product Type:</label>
        <p>{product.productType}</p>
        <label>Description:</label>
        <p>{product.details.description}</p>
        <label>Author:</label>
        <p>{product.details.author}</p>
        <label>Release Date:</label>
        <p>{product.details.releaseDate}</p>
      </div>
      <div>
        <label>Price:</label>
        <div>
          <p>{eurFormat(product.price)}</p>
          <button>Change price</button>
        </div>
        <label>In Stock:</label>
        <div>
          <p>{product.countInStock}</p>
          <button>Restock</button>
        </div>
        <label>Items sold:</label>
        <p>{product.unitsSold}</p>
      </div>
    </>
  );
};

export default AdminProductDetail;
