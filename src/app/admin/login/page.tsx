import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl font-extrabold text-green-800">
            S
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-green-700">
            SanHe CMS
          </p>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-950">
            管理员登录
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            登录后可以管理产品、图片、页面内容和客户询盘。
          </p>

          <AdminLoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          仅限 SanHe 授权管理人员使用
        </p>
      </div>
    </main>
  );
}