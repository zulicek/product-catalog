
'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store/store'
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../store/cartSlice'
import { CloseOutlined } from '@ant-design/icons'

interface CartProps {
  onClose: () => void
}

export default function Cart({ onClose }: CartProps) {
  const dispatch = useAppDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
      <CloseOutlined
          style={{ fontSize: "1.5rem" }}
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-gray-900 cursor-pointer"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-primary text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-xl font-bold">Total: ${cartTotal.toFixed(2)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}