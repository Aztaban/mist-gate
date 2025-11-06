interface SortableHeaderProps<T> {
  label: string;
  sortKey: keyof T;
  currentSortKey: keyof T | null;
  currentSortDirection: 'asc' | 'desc' | null;
  onSort: (key: keyof T) => void;
  className?: string;
}

const SortableHeader = <T,>({
  label,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
  className,
}: SortableHeaderProps<T>) => {
  const getSortIcon = () => {
    if (currentSortKey !== sortKey) return '↕';
    return currentSortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <th className={className} onClick={() => onSort(sortKey)}>
      {label} {getSortIcon()}
    </th>
  );
};

export default SortableHeader;
