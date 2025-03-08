import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/apiSlices/productApiSlice';
import ProductCart from './ProductCart';
import ProductDetails from './ProductDetails';
import ProductBar from './ProductBar';
import { getImageUrl } from '../../utils/utils';

const SingleProductPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductByIdQuery(productId || '');

  let content = <p>nothing</p>;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  }

  if (isSuccess) {
    content = (<>
      <article className="product__page">
        <img src={getImageUrl(product.image)} alt={product.name}/>

        <div className="product__page-div">
          <h2>{product.name}</h2>
          <ProductDetails product={product} />
          <ProductCart isCart={true} product={product} />
        </div>
      </article>
    <ProductBar productId={product.id} />
    </>
    );
  }

  return content;
};

export default SingleProductPage;
