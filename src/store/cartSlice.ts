import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as cartService from '../services/cartService';
import { RootState } from './store';

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartService.loadCartFromLocalStorage() as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      cartService.saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter(item => item.id !== action.payload);
      cartService.saveCartToLocalStorage(newState);
      return newState;
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          return state.filter(item => item.id !== action.payload.id);
        }
      }
      cartService.saveCartToLocalStorage(state);
    },
    clearCart: () => {
      cartService.saveCartToLocalStorage([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;
export const selectCartTotal = (state: RootState) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;