import { useState } from 'react';

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc' | null;
}

export const useSorting = <T,>(data: T[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null as unknown as keyof T,
    direction: null,
  });
  const [sortedData, setSortedData] = useState<T[]>(data);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  return { sortedData, sortConfig, handleSort };
};
