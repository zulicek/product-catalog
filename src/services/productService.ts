import api from './api';

export const fetchProducts = async () => {
  const response = await api.get('/products?limit=0');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductDetails = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
