"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface AdminLoginState {
  error: string;
}

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  const email =
    typeof emailValue === "string"
      ? emailValue.trim()
      : "";

  const password =
    typeof passwordValue === "string"
      ? passwordValue
      : "";

  if (!email || !password) {
    return {
      error: "请输入管理员邮箱和密码。",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    console.error(
      "Admin login failed:",
      error.message
    );

    return {
      error: "邮箱或密码不正确，请重新检查。",
    };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}