import { ReactElement, useState } from 'react';
import { Product } from '../../../features/shop/productApiSlice';
import AdminProductsLineItem from './AdminProductsLineItem';
import { useSorting } from '../../../hooks/useSorting';
import { useCategoryFilter } from '../../../hooks/useCategoryFilter';
import { productCategories } from '../../../config/productCategories';
import Dropdown from '../../common/Dropdown';

interface AdminProductsListProps {
  products: Product[];
}

const AdminProductsList = ({
  products,
}: AdminProductsListProps): ReactElement => {
  const { filteredData, selectedCategories, handleCategoryFilterChange } =
  useCategoryFilter(products, 'productType');
  const { sortedData, sortConfig, handleSort } = useSorting(filteredData);


  if (!products || products.length === 0) {
    return <p>No products to found.</p>;
  }

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <table className="admin-products-list">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            Product name {getSortIcon('name')}
          </th>
          <th onClick={() => handleSort('countInStock')}>
            In Stock {getSortIcon('countInStock')}
          </th>
          <th onClick={() => handleSort('unitsSold')}>
            Items Sold {getSortIcon('unitsSold')}
          </th>
          <th onClick={() => handleSort('price')}>
            Price {getSortIcon('price')}
          </th>
          <th>
            <Dropdown
              title="Category"
              options={productCategories}
              selectedOptions={selectedCategories}
              onOptionChange={handleCategoryFilterChange}
            />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((product) => (
          <AdminProductsLineItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductsList;
