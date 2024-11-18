'use client'

import React from 'react'
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[]
  onProductClick: (id: number) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div data-testid="product-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
      ))}
    </div>
  )
}