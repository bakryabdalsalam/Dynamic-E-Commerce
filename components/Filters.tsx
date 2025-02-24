import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { RootState } from '../store/store';
import { setCategory, setPriceSort } from '../store/slices/productsSlice';

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.products);
  
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white shadow-sm">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort by Price
        </label>
        <select
          value={filters.priceSort || ''}
          onChange={(e) => dispatch(setPriceSort(e.target.value as 'asc' | 'desc' | null))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;