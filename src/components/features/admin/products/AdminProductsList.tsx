import { ReactElement, useMemo } from 'react';
import { Product } from '@types';
import AdminProductsLineItem from './AdminProductsLineItem';
import { useSorting } from '@hooks/state/useSorting';
import { useIdFilter } from '@hooks/filters/useIdFilter';
import Dropdown from '@components/common/Dropdown';
import SortableHeader from '../SortableHeader';
import usePagination from '@hooks/ui/usePagination';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';

interface AdminProductsListProps {
  products: Product[];
}

const AdminProductsList = ({ products }: AdminProductsListProps): ReactElement => {
  const { data: categories = [] } = useGetCategoriesQuery();

  const categoryOptions = useMemo(() => categories.map((c) => ({ label: c.name, value: c.id })), [categories]);

  const {
    filteredData,
    selectedIds: selectedCategories,
    handleChange: handleCategoryFilterChange,
  } = useIdFilter(products, (p) => p.category);

  const { sortedData, sortConfig, handleSort } = useSorting(filteredData);
  const { paginatedData, paginationControls } = usePagination<Product>({
    data: sortedData,
    itemsPerPage: 15,
  });

  const categoryNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
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
                options={categoryOptions}
                selectedOptions={selectedCategories}
                onOptionChange={handleCategoryFilterChange}
              />
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((product) => (
            <AdminProductsLineItem
              key={product.id}
              product={product}
              categoryName={categoryNameById.get(product.category) ?? '—'}
            />
          ))}
        </tbody>
      </table>
      {paginationControls}
    </>
  );
};

export default AdminProductsList;
