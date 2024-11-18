"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { CloseOutlined } from "@ant-design/icons";
import {
  getProductDetails,
  selectProductDetails,
  selectProductsStatus,
} from "../store/productsSlice";

interface ProductModalProps {
  productId: number;
  onClose: () => void;
}

export default function ProductModal({
  productId,
  onClose,
}: ProductModalProps) {
  const product = useSelector(selectProductDetails);
  const status = useSelector(selectProductsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  if (!product) return null;

  return (
    <div
      data-testid="product-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full h-[90vh] overflow-y-auto relative">
        <CloseOutlined
          data-testid="modal-close-button"
          style={{ fontSize: "1.5rem" }}
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-gray-900 cursor-pointer"
        />

        {status == "loading" ? (
          <p className="text-lg font-semibold p-6">Loading...</p>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-contain mb-4"
            />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <button
                data-testid="add-to-cart-button"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                    })
                  )
                }
                className="bg-primary text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-24 object-contain"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
