import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, category, image, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-blue-600 uppercase tracking-wide">{category}</p>
        <h3 className="mt-1 text-lg font-medium text-gray-900 truncate">{title}</h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-2">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;