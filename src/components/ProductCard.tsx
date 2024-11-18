"use client";

import React from "react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      data-testid="product-card"
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex-col flex">
        <h3 data-testid="product-name" className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-2 flex-1">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span data-testid="product-price" className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <button
            data-testid="product-card-modal-trigger"
            onClick={onClick}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
