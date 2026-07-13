import { logoutAdmin } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface AdminProfile {
  display_name: string | null;
  role: "owner" | "admin" | "editor" | "viewer";
  is_active: boolean;
}

interface DashboardStat {
  label: string;
  value: number;
  description: string;
  href: string;
}

function getRoleLabel(role: AdminProfile["role"]) {
  const roleLabels: Record<
    AdminProfile["role"],
    string
  > = {
    owner: "所有者",
    admin: "管理员",
    editor: "编辑人员",
    viewer: "查看人员",
  };

  return roleLabels[role];
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    adminProfileResult,
    categoryCountResult,
    productCountResult,
    draftCountResult,
    publishedCountResult,
  ] = await Promise.all([
    supabase
      .from("admin_users")
      .select(
        "display_name, role, is_active"
      )
      .eq("user_id", user.id)
      .maybeSingle<AdminProfile>(),

    supabase
      .from("product_categories")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "draft"),

    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "published"),
  ]);

  const profile =
    adminProfileResult.data;

  if (
    adminProfileResult.error ||
    !profile ||
    !profile.is_active
  ) {
    console.error(
      "Admin profile verification failed:",
      adminProfileResult.error?.message ??
        "No active admin profile found."
    );

    redirect("/admin/login");
  }

  const queryErrors = [
    categoryCountResult.error,
    productCountResult.error,
    draftCountResult.error,
    publishedCountResult.error,
  ].filter(Boolean);

  if (queryErrors.length > 0) {
    console.error(
      "Dashboard statistics query failed:",
      queryErrors.map(
        (error) => error?.message
      )
    );
  }

  const stats: DashboardStat[] = [
    {
      label: "产品分类",
      value:
        categoryCountResult.count ?? 0,
      description:
        "管理四大产品分类及排序。",
      href: "/admin/categories",
    },
    {
      label: "全部产品",
      value:
        productCountResult.count ?? 0,
      description:
        "查看后台中的全部产品资料。",
      href: "/admin/products",
    },
    {
      label: "草稿产品",
      value:
        draftCountResult.count ?? 0,
      description:
        "尚未发布、仍在编辑中的产品。",
      href: "/admin/products?status=draft",
    },
    {
      label: "已发布产品",
      value:
        publishedCountResult.count ?? 0,
      description:
        "已经批准发布的产品。",
      href: "/admin/products?status=published",
    },
  ];

  const displayName =
    profile.display_name?.trim() ||
    user.email ||
    "SanHe Administrator";

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <p className="mt-1 text-sm text-gray-500">
              内容管理后台
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-950">
                {displayName}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {getRoleLabel(
                  profile.role
                )}
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                退出登录
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="overflow-hidden rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
                Dashboard
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                欢迎回来，
                {displayName}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-green-100">
                这里将用于管理产品、分类、图片、页面内容和客户询盘。
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur">
              <p className="text-sm text-green-100">
                当前权限
              </p>

              <p className="mt-2 text-2xl font-bold">
                {getRoleLabel(
                  profile.role
                )}
              </p>

              <p className="mt-2 text-sm text-green-100">
                {user.email}
              </p>
            </div>
          </div>
        </section>

        {queryErrors.length > 0 && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800"
          >
            部分统计数据暂时无法读取，请检查终端中的 Supabase 错误日志。
          </div>
        )}

        <section className="mt-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              Overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-950">
              内容数据概览
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              目前数据库刚刚建立，因此初始数量显示为零是正常的。
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(
              (stat, index) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 font-extrabold text-green-800">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <span className="text-4xl font-extrabold text-gray-950">
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-gray-950">
                    {stat.label}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {stat.description}
                  </p>

                  <p className="mt-6 text-sm font-bold text-green-700 transition group-hover:text-green-900">
                    进入管理 →
                  </p>
                </Link>
              )
            )}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              Next Step
            </p>

            <h2 className="mt-4 text-2xl font-bold text-gray-950">
              产品分类管理
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              下一步将先建立产品分类列表和新增分类功能，作为产品后台的基础。
            </p>

            <Link
              href="/admin/categories"
              className="mt-7 inline-flex rounded-xl bg-green-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-900"
            >
              查看分类模块
            </Link>
          </article>

          <article className="rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              Current Status
            </p>

            <h2 className="mt-4 text-2xl font-bold text-gray-950">
              数据库迁移尚未开始
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              当前前台仍然读取原有 TypeScript 产品数据。后台数据库与前台暂时并行运行，不会影响现有网站。
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}