import api from './api';
import { isBrowser } from '../../lib/utils';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const refreshAuthToken = async (token: string) => {
  const response = await api.post('/auth/refresh',
    {
      refreshToken: token,
      expiresInMins: 30,
      credentials: 'include'
    }, {
      headers: { 'Content-Type': 'application/json' },
    })

  return response.data;
};

export const saveUserDataToLocalStorage = (accesToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accesToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};


export const loadUserDataFromLocalStorage = () => {
  if (isBrowser()) {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
    };
  }
  return {
    accessToken: null,
    refreshToken: null,
  };
};

export const removeUserDataFromLocalStorage = () => {
  if (isBrowser()) {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
};

export const getAuthUser = async () => {
  const response = await api.get('/auth/user/me');
  return response.data;
};