import { ReactElement } from 'react';
import { Product } from '@types';
import AdminProductsLineItem from './AdminProductsLineItem';
import { useSorting } from '@hooks/state/useSorting';

import SortableHeader from '../SortableHeader';
import usePagination from '@hooks/ui/usePagination';

interface AdminProductsListProps {
  products: Product[];
}

const AdminProductsList = ({ products }: AdminProductsListProps): ReactElement => {
  const { sortedData, sortConfig, handleSort } = useSorting(products);
  const { paginatedData, paginationControls } = usePagination<Product>({
    data: sortedData,
    itemsPerPage: 15,
  });

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <>
      <table className="table table--compact surface-dark product-table">
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
              className="prod-col-sold"
            />
            <SortableHeader
              label="Price"
              sortKey="price"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
            />
            <th className="prod-col-actions"></th>
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
