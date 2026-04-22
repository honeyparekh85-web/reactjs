import { useMemo, useState } from 'react';

const initialFilters = {
  search: '',
  category: 'All',
  gender: 'All',
  family: 'All',
  featuredOnly: false,
  maxPrice: 150,
  sortBy: 'featured',
};

export function useFilter(items) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProducts = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesSearch =
        !query ||
        [item.name, item.brand, item.family, ...(item.notes ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesCategory = filters.category === 'All' || item.category === filters.category;
      const matchesGender = filters.gender === 'All' || item.gender === filters.gender;
      const matchesFamily = filters.family === 'All' || item.family === filters.family;
      const matchesFeatured = !filters.featuredOnly || item.featured;
      const matchesPrice = item.price <= filters.maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGender &&
        matchesFamily &&
        matchesFeatured &&
        matchesPrice
      );
    });

    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.launchYear - a.launchYear;
        case 'featured':
        default:
          return Number(b.featured) - Number(a.featured) || b.rating - a.rating;
      }
    });
  }, [filters, items]);

  const activeFilters = useMemo(() => {
    const entries = [];

    if (filters.search) {
      entries.push({ key: 'search', label: `Search: ${filters.search}` });
    }

    if (filters.category !== 'All') {
      entries.push({ key: 'category', label: filters.category });
    }

    if (filters.gender !== 'All') {
      entries.push({ key: 'gender', label: filters.gender });
    }

    if (filters.family !== 'All') {
      entries.push({ key: 'family', label: filters.family });
    }

    if (filters.featuredOnly) {
      entries.push({ key: 'featuredOnly', label: 'Featured only' });
    }

    if (filters.maxPrice < initialFilters.maxPrice) {
      entries.push({ key: 'maxPrice', label: `Under $${filters.maxPrice}` });
    }

    if (filters.sortBy !== initialFilters.sortBy) {
      entries.push({ key: 'sortBy', label: `Sorted: ${filters.sortBy}` });
    }

    return entries;
  }, [filters]);

  return {
    filters,
    filteredProducts,
    resultsCount: filteredProducts.length,
    activeFilters,
    activeFilterCount: activeFilters.length,
    updateFilter,
    resetFilters,
  };
}

