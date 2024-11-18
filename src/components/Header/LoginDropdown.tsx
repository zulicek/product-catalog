import React, { useState } from "react";
import { Dropdown, MenuProps, DropdownProps } from "antd";
import { LoginOutlined } from "@ant-design/icons";

interface LoginDropdownProps {
  username: string;
  password: string;
  authStatus: string;
  authError: string | null;
  handleLogin: (e: React.FormEvent) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export default function LoginDropdown({
  username,
  password,
  authStatus,
  authError,
  handleLogin,
  setUsername,
  setPassword,
}: LoginDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = () => {
    setOpen(true);
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "login",
            label: (
              <form
                data-testid="login-form"
                onSubmit={handleLogin}
                className="flex flex-col p-4"
              >
                <input
                  data-testid="username-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded px-2 py-1 mb-2"
                />
                <input
                  data-testid="password-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded px-2 py-1 mb-2"
                />
                <span data-testid="login-error" className="text-xs text-red-500 h-4 mt-0 mb-2">
                  {authStatus === "failed" && authError}
                </span>
                <button
                  data-testid="login-submit"
                  type="submit"
                  disabled={authStatus === "loading"}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
                >
                  {authStatus === "loading" ? "Logging in..." : "Login"}
                </button>
              </form>
            ),
          },
        ],
        onClick: handleMenuClick,
      }}
      placement="bottomLeft"
      onOpenChange={handleOpenChange}
      open={open}
    >
      <div data-testid="login-button" className="text-white px-2 py-2 relative hover:text-zinc-100 cursor-pointer">
        <LoginOutlined style={{ fontSize: "1.5rem" }} />
      </div>
    </Dropdown>
  );
}
