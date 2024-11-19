"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAuthUser,
  selectUser,
  selectAuthStatus,
  login,
  logout,
  selectAuthError,
} from "../../store/authSlice";
import { selectCartItems } from "../../store/cartSlice";
import Cart from "../Cart";
import { useAppDispatch } from "../../store/store";
import { useTokenRefresh } from "../../hooks/useTokenRefresh";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import LoginDropdown from "./LoginDropdown";
import logoImage from "../../../app/logo-x2.png";
import Image from "next/image";

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const refreshTokenIfNeeded = useTokenRefresh();
  const cartItems = useSelector(selectCartItems);

  const [showCart, setShowCart] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isClient, setIsClient] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authStatus === "idle") {
      dispatch(getAuthUser());
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    refreshTokenIfNeeded();
  }, [refreshTokenIfNeeded]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-secondary shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between">
        <Image
          src={logoImage}
          alt="Logo"
          width={100}
          className="object-contain"
        />
        <div className="flex items-center">
          {user ? (
            <>
              <label data-testid="user-greeting" className="text-white">
                Welcome, {user.username}
              </label>
              <button
                onClick={() => dispatch(logout())}
                className="text-primary px-4 py-2 rounded hover:text-white"
              >
                <LogoutOutlined style={{ fontSize: "1.5rem" }} />
              </button>
            </>
          ) : (
            <LoginDropdown
              username={username}
              password={password}
              authStatus={authStatus}
              authError={authError}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}
          <button
            onClick={() => setShowCart(true)}
            className="text-white px-2 py-2 relative hover:text-zinc-100"
          >
            <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
            {isClient && cartItems.length > 0 && (
              <span
                data-testid="cart-count"
                className="absolute top-0 right-0 text-xs font-bold bg-primary rounded-full text-white w-3.5 h-3.5"
              >
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </header>
  );
}
