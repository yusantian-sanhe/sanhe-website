"use client";

import {
  useActionState,
} from "react";
import {
  loginAdmin,
  type AdminLoginState,
} from "@/app/admin/actions";

const initialState: AdminLoginState = {
  error: "",
};

export function AdminLoginForm() {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    loginAdmin,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mt-8 space-y-6"
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          管理员邮箱
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isPending}
          placeholder="admin@example.com"
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          密码
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isPending}
          placeholder="请输入密码"
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {state.error && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-2xl bg-green-800 px-6 py-4 font-bold text-white transition hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "正在登录..."
          : "登录 SanHe CMS"}
      </button>
    </form>
  );
}