import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts, setPage } from '../store/slices/productsSlice';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status, error, currentPage, itemsPerPage } = 
    useSelector((state: RootState) => state.products);
  
  const observer = useRef<IntersectionObserver>();
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (status === 'loading') return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(setPage(currentPage + 1));
      }
    });
    
    if (node) observer.current.observe(node);
  }, [status, currentPage, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading' && currentPage === 1) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

  const displayedProducts = filteredItems.slice(0, currentPage * itemsPerPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {displayedProducts.map((product, index) => {
        if (index === displayedProducts.length - 1) {
          return (
            <div ref={lastProductRef} key={product.id}>
              <ProductCard {...product} />
            </div>
          );
        }
        return <ProductCard key={product.id} {...product} />;
      })}
      {status === 'loading' && currentPage > 1 && (
        <div className="col-span-full flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {displayedProducts.length === 0 && (
        <div className="col-span-full text-center text-gray-500 p-4">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProductGrid;