import { ReactElement, useState } from 'react';
import { Product } from '../../../features/shop/productApiSlice';
import AdminProductsLineItem from './AdminProductsLineItem';
import { useSorting } from '../../../hooks/useSorting';
import { useCategoryFilter } from '../../../hooks/useCategoryFilter';

interface AdminProductsListProps {
  products: Product[];
}

const categories = ['book', 'game', 'comic', 'board game'];

const AdminProductsList = ({
  products,
}: AdminProductsListProps): ReactElement => {
  const { sortedData, sortConfig, handleSort } = useSorting(products);
  const { filteredData, selectedCategories, handleCategoryFilterChange } =
    useCategoryFilter(sortedData, 'productType');

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

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
            <div className="category-header" onClick={toggleDropdown}>
              Category {isCategoryDropdownOpen ? '▲' : '▼'}
            </div>
            {isCategoryDropdownOpen && (
              <div className="dropdown">
                {categories.map((category) => (
                  <label
                    key={category}
                    style={{ display: 'block', margin: '5px 0' }}
                  >
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryFilterChange(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            )}
          </th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((product) => (
          <AdminProductsLineItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductsList;
