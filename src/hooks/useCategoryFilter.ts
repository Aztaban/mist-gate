import { useState, useMemo } from 'react';

export const useCategoryFilter = <T>(data: T[], categoryKey: keyof T) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return data;

    return data.filter((item) =>
      selectedCategories.includes(item[categoryKey] as string)
    );
  }, [data, selectedCategories, categoryKey]);

  const handleCategoryFilterChange = (updatedCategories: string[]) => {
    setSelectedCategories(updatedCategories);
  };

  return { filteredData, selectedCategories, handleCategoryFilterChange };
};
