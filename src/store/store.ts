
'use client'

import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../store/productsSlice'
import filtersReducer from './filtersSlice'
import authReducer from './authSlice'
import cartReducer from '../store/cartSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    auth: authReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();