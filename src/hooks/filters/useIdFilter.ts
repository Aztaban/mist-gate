import { useState, useMemo } from 'react';

export function useIdFilter<T>(data: T[], getId: (item: T) => string) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (selectedIds.length === 0) return data;
    const allow = new Set(selectedIds);
    return data.filter((item) => allow.has(getId(item)));
  }, [data, selectedIds, getId]);

  const handleChange = (ids: string[]) => setSelectedIds(ids);

  return { filteredData, selectedIds, handleChange };
}
