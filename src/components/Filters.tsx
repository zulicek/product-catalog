"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import {
  setCategory,
  setPriceRange,
  setSortBy,
  setSearchQuery,
  selectCategory,
  selectPriceRange,
  selectSortBy,
  selectSearchQuery,
} from "../store/filtersSlice";
import { getCategories, selectCategories } from "../store/productsSlice";

export default function Filters() {
  const dispatch = useAppDispatch();
  const category = useSelector(selectCategory);
  const priceRange = useSelector(selectPriceRange);
  const sortBy = useSelector(selectSortBy);
  const searchQuery = useSelector(selectSearchQuery);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0 lg:space-x-4 items-center justify-between">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full lg:w-2/6 p-2 border rounded"
      />
      <select
        data-testid="category-filter"
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="w-full lg:w-1/6 p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        data-testid="sort-select"
        value={sortBy}
        onChange={(e) =>
          dispatch(
            setSortBy(
              e.target.value as
                | "price-asc"
                | "price-desc"
                | "name-asc"
                | "name-desc"
            )
          )
        }
        className="w-full lg:w-1/6 p-2 border rounded"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>

      <div className="w-full lg:w-2/6 flex space-x-2 items-center">
        <label className="mr-2 whitespace-nowrap">Price Range:</label>
        <input
          type="number"
          value={priceRange[0]}
          min={0}
          onChange={(e) =>
            dispatch(setPriceRange([Number(e.target.value), priceRange[1]]))
          }
          className="w-1/2 p-2 border rounded"
        />
        <input
          type="number"
          value={priceRange[1]}
          min={0}
          onChange={(e) =>
            dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))
          }
          className="w-1/2 p-2 border rounded"
        />
      </div>
    </div>
  );
}
