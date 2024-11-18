import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productService from '../services/productService';
import { RootState } from './store';
import { PRODUCTS_PER_PAGE } from '../config'
import { Product, Category } from '../types';

interface ProductsState {
  items: Product[]
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  currentPage: number
  currentProduct: Product | null
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  currentProduct: null
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    return await productService.fetchProducts();
  }
);

export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (productId: number) => {
    return await productService.fetchProductDetails(productId);
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async () => {
    return await productService.fetchCategories();
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.currentPage = Math.ceil(action.payload.skip / PRODUCTS_PER_PAGE);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred while loading products';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.status = 'loading';
      })
  }
})

export const selectProducts = (state: RootState) => state.products.items;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectProductDetails = (state: RootState) => state.products.currentProduct;

export default productsSlice.reducer;