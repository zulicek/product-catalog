'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getProducts, selectProducts, selectProductsStatus, selectCurrentPage } from '../store/productsSlice';
import { selectCategory, selectPriceRange, selectSortBy, selectSearchQuery } from '../store/filtersSlice'
import { useAppDispatch } from '../store/store'
import ProductGrid from './ProductGrid'
import Filters from './Filters'
import Pagination from './Pagination'
import ProductModal from './ProductModal'
import { PRODUCTS_PER_PAGE } from '../config'

export default function ProductCatalog() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)
  const [currentPage, setCurrentPage] = useState(useSelector(selectCurrentPage))
  const category = useSelector(selectCategory)
  const priceRange = useSelector(selectPriceRange)
  const sortBy = useSelector(selectSortBy)
  const searchQuery = useSelector(selectSearchQuery)

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [category, priceRange, sortBy, searchQuery])

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        (category === '' || product.category === category) &&
        (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'name-asc':
            return a.title.localeCompare(b.title)
          case 'name-desc':
            return b.title.localeCompare(a.title)
          default:
            return 0
        }
      })
  }, [products, category, priceRange, sortBy, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])



  return (
    <div className="py-8">
      <Filters />
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error loading products</div>}
      {status === 'succeeded' && (
        <>
          <ProductGrid products={paginatedProducts} onProductClick={setSelectedProduct} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
      {selectedProduct !== null && (
        <ProductModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}