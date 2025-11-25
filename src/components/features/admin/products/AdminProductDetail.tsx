import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '@types';
import { eurFormat } from '@utils';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';
import RestockModal from './modals/RestockModal';
import PriceChangeModal from './modals/PriceChangeModal';
import ProductImageUpadteModal from './modals/ProductImageUpdateModal';

interface AdminProductDetailProps {
  product: Product;
  onEdit?: () => void;
}

type ModalType = 'restock' | 'priceChange' | 'image' | null;

const AdminProductDetail = ({ product, onEdit }: AdminProductDetailProps): JSX.Element => {
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
    <section className="surface-dark section product-editor product-editor--detail">
      <header className="section-bar section-bar--sub">
        <h2 className="section-bar__title section-bar__title--sm">Product Detail</h2>

        <div className="section-bar__actions">
          <NavLink to="/admin/products" className="btn btn--ghost btn--sm">
            Back to products
          </NavLink>
          {onEdit && (
            <button type="button" className="btn btn--brand btn--sm" onClick={onEdit}>
              Edit Product
            </button>
          )}
        </div>
      </header>

      <div className="product-editor__form product-editor__form--detail">
        <div className="product-editor__grid product-editor__grid--detail">
          {/* Left: textual info */}
          <div className="product-editor__col product-editor__col--main">
            <div className="product-editor__group admin-product-detail__info">
              <h3 className="product-editor__group-title">Overview</h3>

              <div className="product-detail__field">
                <span className="product-detail__label">Product Name</span>
                <span className="product-detail__value">{product.name}</span>
              </div>

              <div className="product-detail__field">
                <span className="product-detail__label">Category</span>
                <span className="product-detail__value">{categoryName}</span>
              </div>

              <div className="product-detail__field">
                <span className="product-detail__label">Author</span>
                <span className="product-detail__value">{author}</span>
              </div>

              <div className="product-detail__field">
                <span className="product-detail__label">Release Date</span>
                <span className="product-detail__value">{releaseDateStr}</span>
              </div>

              <div className="product-detail__field product-detail__field--description">
                <span className="product-detail__label">Description</span>
                <span className="product-detail__value product-detail__value--multiline">{description}</span>
              </div>
            </div>
          </div>

          {/* Right: image + pricing */}
          <aside className="product-editor__col product-editor__col--media admin-product-detail__side">
            <div className="product-editor__media admin-product-detail__media">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <button
              type="button"
              className="btn btn--ghost btn--sm admin-product-detail__image-btn"
              onClick={() => setActiveModal('image')}>
              Change image
            </button>

            <div className="product-editor__group admin-product-detail__pricing">
              <h3 className="product-editor__group-title">Stock &amp; Pricing</h3>

              <div className="product-detail__field">
                <span className="product-detail__label">Price</span>
                <span className="product-detail__value">{eurFormat(product.price)}</span>
              </div>

              <div className="product-detail__field">
                <span className="product-detail__label">In stock</span>
                <span className="product-detail__value">{product.countInStock}</span>
              </div>

              <div className="product-detail__field">
                <span className="product-detail__label">Items sold</span>
                <span className="product-detail__value">{product.unitsSold}</span>
              </div>

              <div className="product-detail__actions">
                <button type="button" className="btn btn--brand btn--sm" onClick={() => setActiveModal('priceChange')}>
                  Change price
                </button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setActiveModal('restock')}>
                  Restock
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Modals */}
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
    </section>
  );
};

export default AdminProductDetail;
