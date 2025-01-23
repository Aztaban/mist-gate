import React from 'react';

interface SortableHeaderProps<T> {
  label: string;
  sortKey: keyof T;
  currentSortKey: keyof T | null;
  currentSortDirection: 'asc' | 'desc' | null;
  onSort: (key: keyof T) => void;
}

const SortableHeader = <T,>({
  label,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
}: SortableHeaderProps<T>) => {
  const getSortIcon = () => {
    if (currentSortKey !== sortKey) return '↕';
    return currentSortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <th onClick={() => onSort(sortKey)}>
      {label} {getSortIcon()}
    </th>
  );
};

export default SortableHeader;
