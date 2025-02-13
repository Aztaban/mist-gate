import { useState } from 'react';
import { Product } from '../../../features/shop/productApiSlice';
import { getImageUrl } from '../../../utils/utils';
import { eurFormat } from '../../../utils/utils';
import RestockModal from './RestockModal';
import PriceChangeModal from './PriceChangeModal';
import ProductImageUpadteModal from './ProductImageUpdateModal';

interface AdminProductDetailProps {
  product: Product;
}

type ModalType = 'restock' | 'priceChange' | 'image' | null;

const AdminProductDetail = ({
  product,
}: AdminProductDetailProps): JSX.Element => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="admin-product-detail">
      <div className="product-info">
        <label>Product Name:</label>
        <p>{product.name}</p>
        <label>Product Type:</label>
        <p>{product.productType}</p>
        <label className="description-label">Description:</label>
        <p>{product.details.description}</p>
        <label>Author:</label>
        <p>{product.details.author}</p>
        <label>Release Date:</label>
        <p>{product.details.releaseDate}</p>
      </div>
      <div className="image-container">
        <img src={getImageUrl(product.image)} alt={product.name} />
        <button className="btn save-btn" onClick={() => setActiveModal('image')}>Change Image</button>
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

        <button
          className="btn save-btn"
          onClick={() => setActiveModal('priceChange')}
        >
          Change price
        </button>
        <button
          className="btn save-btn"
          onClick={() => setActiveModal('restock')}
        >
          Restock
        </button>

        {activeModal === 'restock' && (
          <RestockModal
            currentStock={product.countInStock}
            productId={product.id}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'priceChange' && (
          <PriceChangeModal
            currentPrice={product.price}
            productId={product.id}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'image' && (
          <ProductImageUpadteModal
            productId={product.id}
            currentImage={product.image}
            onClose={() => setActiveModal(null)}
          />
        )
      }
      </div>
    </div>
  );
};

export default AdminProductDetail;
