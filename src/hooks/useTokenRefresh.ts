import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { refreshAuthToken, selectRefreshToken } from '../store/authSlice';

export const useTokenRefresh = () => {
  const dispatch = useAppDispatch();
  const refreshToken = useSelector(selectRefreshToken);

  const refreshTokenIfNeeded = useCallback(() => {
    if (refreshToken) {
      dispatch(refreshAuthToken());
    }
  }, [dispatch, refreshToken]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      refreshTokenIfNeeded();
    }, 1 * 29 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [refreshTokenIfNeeded]);

  return refreshTokenIfNeeded;
};