import React from 'react';
import Head from 'next/head';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dynamic E-Commerce Catalog</title>
        <meta name="description" content="Browse our product catalog with dynamic filtering and sorting" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto">
          <Filters />
          <ProductGrid />
        </div>
      </main>
    </>
  );
}