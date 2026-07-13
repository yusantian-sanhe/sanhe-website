import { CategoryCreateForm } from "@/components/admin/categories/CategoryCreateForm";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic =
  "force-dynamic";

interface CategoryTranslations {
  en?: {
    name?: string;
    description?: string;
  };

  zh?: {
    name?: string;
    description?: string;
  };

  ru?: {
    name?: string;
    description?: string;
  };

  ar?: {
    name?: string;
    description?: string;
  };

  es?: {
    name?: string;
    description?: string;
  };

  fr?: {
    name?: string;
    description?: string;
  };
}

interface CategoryRow {
  id: string;
  slug: string;
  translations: CategoryTranslations;
  image_path: string | null;
  sort_order: number;
  status:
    | "draft"
    | "published"
    | "archived";
  created_at: string;
  updated_at: string;
}

function getStatusLabel(
  status: CategoryRow["status"]
) {
  const labels: Record<
    CategoryRow["status"],
    string
  > = {
    draft: "草稿",
    published: "已发布",
    archived: "已归档",
  };

  return labels[status];
}

function getStatusClassName(
  status: CategoryRow["status"]
) {
  if (status === "published") {
    return "bg-green-50 text-green-700";
  }

  if (status === "archived") {
    return "bg-gray-100 text-gray-600";
  }

  return "bg-amber-50 text-amber-700";
}

export default async function AdminCategoriesPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const {
    data,
    error,
  } = await supabase
    .from("product_categories")
    .select(
      "id, slug, translations, image_path, sort_order, status, created_at, updated_at"
    )
    .order("sort_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  const categories =
    (data ?? []) as CategoryRow[];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-950">
              产品分类管理
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
          >
            ← 返回后台首页
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Product Categories
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            管理产品分类
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-green-100">
            分类是产品后台的基础。当前可以先完成中英文内容，其他语言可由办公室后续补充。
          </p>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                  Categories
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-950">
                  已有分类
                </h2>
              </div>

              <p className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
                共 {categories.length} 个
              </p>
            </div>

            {error && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
                分类读取失败，请检查终端中的 Supabase 错误。
              </div>
            )}

            {!error &&
              categories.length === 0 && (
                <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                  <p className="text-xl font-bold text-gray-950">
                    还没有产品分类
                  </p>

                  <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
                    请使用右侧表单创建第一个分类，例如“新鲜蔬菜”。
                  </p>
                </div>
              )}

            {!error &&
              categories.length > 0 && (
                <div className="mt-8 space-y-4">
                  {categories.map(
                    (category) => {
                      const englishName =
                        category.translations
                          .en?.name?.trim() ||
                        "未填写英文名称";

                      const chineseName =
                        category.translations
                          .zh?.name?.trim() ||
                        "未填写中文名称";

                      return (
                        <article
                          key={category.id}
                          className="rounded-3xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/40"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-5">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-xl font-bold text-gray-950">
                                  {englishName}
                                </h3>

                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClassName(
                                    category.status
                                  )}`}
                                >
                                  {getStatusLabel(
                                    category.status
                                  )}
                                </span>
                              </div>

                              <p className="mt-2 font-semibold text-gray-700">
                                {chineseName}
                              </p>

                              <p className="mt-3 break-all font-mono text-sm text-gray-500">
                                /{category.slug}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                排序
                              </p>

                              <p className="mt-1 text-2xl font-extrabold text-gray-950">
                                {
                                  category.sort_order
                                }
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
                            <p className="text-xs text-gray-500">
                              更新时间：
                              {new Intl.DateTimeFormat(
                                "zh-CN",
                                {
                                  dateStyle:
                                    "medium",
                                  timeStyle:
                                    "short",
                                }
                              ).format(
                                new Date(
                                  category.updated_at
                                )
                              )}
                            </p>

                            <Link
  href={`/admin/categories/${category.id}`}
  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
>
  编辑分类 →
</Link>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
          </section>

          <aside className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 xl:sticky xl:top-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              New Category
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-950">
              新增产品分类
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              中英文名称为必填项。建议新分类先保存为草稿，内容确认后再发布。
            </p>

            <div className="mt-8">
              <CategoryCreateForm />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}