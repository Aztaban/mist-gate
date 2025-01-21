import { useState } from 'react';

export const useCategoryFilter = <T>(data: T[], categoryKey: keyof T) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const handleCategoryFilterChange = (updatedCategories: string[]) => {
    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        updatedCategories.includes(item[categoryKey] as string)
      );
      setFilteredData(filtered);
    }
  };

  return { filteredData, selectedCategories, handleCategoryFilterChange };
};
