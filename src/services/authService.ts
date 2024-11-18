import api from './api';
import { isBrowser } from '../../lib/utils';

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
    localStorage.setItem('accessToken', accesToken);
    localStorage.setItem('refreshToken', refreshToken);
};


export const loadUserDataFromLocalStorage = () => {
  if (isBrowser()) {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return {
    accessToken: null,
    refreshToken: null,
  };
};

export const removeUserDataFromLocalStorage = () => {
  if (isBrowser()) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const getAuthUser = async () => {
  const response = await api.get('/auth/user/me');
  return response.data;
};