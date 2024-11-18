'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface FiltersState {
  category: string
  priceRange: [number, number]
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
  searchQuery: string
}

const initialState: FiltersState = {
  category: '',
  priceRange: [0, Infinity],
  sortBy: 'name-asc',
  searchQuery: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { setCategory, setPriceRange, setSortBy, setSearchQuery } = filtersSlice.actions

export const selectCategory = (state: RootState) => state.filters.category
export const selectPriceRange = (state: RootState) => state.filters.priceRange
export const selectSortBy = (state: RootState) => state.filters.sortBy
export const selectSearchQuery = (state: RootState) => state.filters.searchQuery

export default filtersSlice.reducer