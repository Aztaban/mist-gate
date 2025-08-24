import { useState, useMemo } from 'react';
import { Product } from '@types';
import { getImageUrl, eurFormat } from '@utils';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';
import RestockModal from './modals/RestockModal';
import PriceChangeModal from './modals/PriceChangeModal';
import ProductImageUpadteModal from './modals/ProductImageUpdateModal';

interface AdminProductDetailProps {
  product: Product;
}

type ModalType = 'restock' | 'priceChange' | 'image' | null;

const AdminProductDetail = ({ product }: AdminProductDetailProps): JSX.Element => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // categories cache to resolve category id -> name
  const { data: categories = [] } = useGetCategoriesQuery();
  const categoryNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);
  const categoryName =
    typeof (product as any).category === 'string'
      ? categoryNameById.get((product as any).category) ?? '—'
      : (product as any).category?.name ?? '—';

  // light date formatting (supports "", undefined)
  const releaseDateStr = (() => {
    const raw = product.details?.releaseDate;
    if (!raw) return 'TBD soon';
    const d = new Date(raw);
    return isNaN(+d) ? raw : d.toLocaleDateString();
  })();

  const description = product.details?.description ?? '—';
  const author = product.details?.author ?? '—';

  return (
    <div className="admin-product-detail">
      <div className="product-info">
        <label>Product Name:</label>
        <p>{product.name}</p>

        <label>Category:</label>
        <p>{categoryName}</p>

        <label className="description-label">Description:</label>
        <p>{description}</p>

        <label>Author:</label>
        <p>{author}</p>

        <label>Release Date:</label>
        <p>{releaseDateStr}</p>
      </div>

      <div className="image-container">
        <img src={getImageUrl(product.image)} alt={product.name} />
        <button className="btn save-btn" onClick={() => setActiveModal('image')}>
          Change Image
        </button>
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

        <button className="btn save-btn" onClick={() => setActiveModal('priceChange')}>
          Change price
        </button>
        <button className="btn save-btn" onClick={() => setActiveModal('restock')}>
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
          <PriceChangeModal currentPrice={product.price} productId={product.id} onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'image' && (
          <ProductImageUpadteModal
            productId={product.id}
            currentImage={product.image}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductDetail;
