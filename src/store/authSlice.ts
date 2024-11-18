"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../services/authService";
import { RootState } from "./store";

interface AuthState {
  user: { id: number; username: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const { accessToken, refreshToken } = authService.loadUserDataFromLocalStorage()

const initialState: AuthState = {
  user: null,
  accessToken,
  refreshToken,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
      const userData = await authService.login(username, password);
      authService.saveUserDataToLocalStorage(
        userData.accessToken,
        userData.refreshToken
      );
      return userData;
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      throw new Error("No token to refresh");
    }
    const userData = await authService.refreshAuthToken(refreshToken);
    authService.saveUserDataToLocalStorage(
      userData.accessToken,
      userData.refreshToken
    );
    return userData;
  }
);

export const getAuthUser = createAsyncThunk(
  "auth/getAuthUser",
  async (_, { rejectWithValue }) => {
    const { accessToken } =
      authService.loadUserDataFromLocalStorage();

    if (accessToken) {
      try {
        const userData = await authService.getAuthUser();
        return userData;
      } catch (error) {
        authService.removeUserDataFromLocalStorage();
        return rejectWithValue("Failed to get user info");
      }
    }
    return rejectWithValue("Failed to get user info");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      authService.removeUserDataFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Invalid username or password";
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export default authSlice.reducer;
