import { ReactElement } from 'react';
import { Product } from '../../../features/shop/productApiSlice';
import AdminProductsLineItem from './AdminProductsLineItem';
import { useSorting } from '../../../hooks/useSorting';
import { useCategoryFilter } from '../../../hooks/useCategoryFilter';
import { productCategories } from '../../../config/productCategories';
import Dropdown from '../../common/Dropdown';
import SortableHeader from '../SortableHeader';
import usePagination from '../../../hooks/usePagination';

interface AdminProductsListProps {
  products: Product[];
}

const AdminProductsList = ({
  products,
}: AdminProductsListProps): ReactElement => {
  const { filteredData, selectedCategories, handleCategoryFilterChange } =
    useCategoryFilter(products, 'productType');
  const { sortedData, sortConfig, handleSort } = useSorting(filteredData);
  const { paginatedData, paginationControls } = usePagination<Product>({
    data: sortedData,
    itemsPerPage: 15,
  } );

  if (!products || products.length === 0) {
    return <p>No products to found.</p>;
  }

  return (
    <>
      <table className="admin-products-list">
        <thead>
          <tr>
            <SortableHeader
              label="Product Name"
              sortKey="name"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
            />
            <SortableHeader
              label="In Stock"
              sortKey="countInStock"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
            />
            <SortableHeader
              label="Items Sold"
              sortKey="unitsSold"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
            />
            <SortableHeader
              label="Price"
              sortKey="price"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
            />
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
          {paginatedData.map((product) => (
            <AdminProductsLineItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      {paginationControls}
    </>
  );
};

export default AdminProductsList;
