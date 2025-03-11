import { useEffect, useState } from 'react';

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc' | null;
}

export const useSorting = <T>(data: T[]) => {
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
  };

  useEffect(() => {
    if (!sortConfig.key) {
      setSortedData(data); // No sort key, use original data
      return;
    }

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
  }, [data, sortConfig]);

  return { sortedData, sortConfig, handleSort };
};
