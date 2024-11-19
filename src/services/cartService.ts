import { CartItem } from '../store/cartSlice';
import { isBrowser } from '../../lib/utils';

const CART_STORAGE_KEY = 'cart';

export const saveCartToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  if (isBrowser()) {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  }
  return [];
};