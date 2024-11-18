'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ProductCatalog from './components/ProductCatalog'
import Header from './components/Header/Header'

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ProductCatalog />
        </main>
      </div>
    </Provider>
  )
}