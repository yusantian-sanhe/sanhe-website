import {
  deleteCategory,
  updateCategoryStatus,
} from "@/app/admin/categories/actions";
import { CategoryEditForm } from "@/components/admin/categories/CategoryEditForm";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

export const dynamic =
  "force-dynamic";

interface CategoryEditPageProps {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
    updated?: string;
  }>;
}

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
  translations:
    CategoryTranslations;
  sort_order: number;
  status:
    | "draft"
    | "published"
    | "archived";
  created_at: string;
  updated_at: string;
}

function getErrorMessage(
  error?: string
) {
  if (error === "has-products") {
    return "该分类下仍有产品，不能删除。请先移动或删除相关产品。";
  }

  if (error === "count") {
    return "无法检查该分类下的产品数量，请稍后重试。";
  }

  if (error === "delete") {
    return "分类删除失败，请检查终端中的错误日志。";
  }

  if (error === "status") {
    return "分类状态修改失败。";
  }

  return "";
}

export default async function CategoryEditPage({
  params,
  searchParams,
}: CategoryEditPageProps) {
  const { id } = await params;

  const query =
    await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    categoryResult,
    productCountResult,
  ] = await Promise.all([
    supabase
      .from("product_categories")
      .select(
        "id, slug, translations, sort_order, status, created_at, updated_at"
      )
      .eq("id", id)
      .maybeSingle(),

    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("category_id", id),
  ]);

  if (
    categoryResult.error ||
    !categoryResult.data
  ) {
    notFound();
  }

  const category =
    categoryResult.data as CategoryRow;

  const productCount =
    productCountResult.count ?? 0;

  const englishName =
    category.translations.en
      ?.name?.trim() ||
    "Unnamed Category";

  const chineseName =
    category.translations.zh
      ?.name?.trim() ||
    "未填写中文名称";

  const errorMessage =
    getErrorMessage(query.error);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-950">
              编辑产品分类
            </h1>
          </div>

          <Link
            href="/admin/categories"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
          >
            ← 返回分类列表
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Edit Category
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            {englishName}
          </h2>

          <p className="mt-3 text-xl font-semibold text-green-100">
            {chineseName}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              /{category.slug}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              产品数量：{productCount}
            </span>
          </div>
        </section>

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">
            {errorMessage}
          </div>
        )}

        {query.updated ===
          "status" && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-bold text-green-800">
            分类状态已成功修改。
          </div>
        )}

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_360px] xl:items-start">
          <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              Category Details
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-950">
              分类资料
            </h2>

            <div className="mt-8">
              <CategoryEditForm
                category={{
                  id: category.id,
                  slug: category.slug,
                  sortOrder:
                    category.sort_order,
                  status:
                    category.status,
                  translations:
                    category.translations,
                }}
              />
            </div>
          </section>

          <aside className="space-y-6 xl:sticky xl:top-8">
            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                Quick Status
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-950">
                快速修改状态
              </h2>

              <div className="mt-6 grid gap-3">
                <StatusButton
                  categoryId={
                    category.id
                  }
                  status="draft"
                  label="设为草稿"
                />

                <StatusButton
                  categoryId={
                    category.id
                  }
                  status="published"
                  label="发布分类"
                />

                <StatusButton
                  categoryId={
                    category.id
                  }
                  status="archived"
                  label="归档分类"
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-red-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-700">
                Danger Zone
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-950">
                删除分类
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                只有分类下没有产品时才允许删除。该操作无法撤销。
              </p>

              <p className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                当前产品数量：
                {productCount}
              </p>

              <form
                action={deleteCategory}
                className="mt-6"
              >
                <input
                  type="hidden"
                  name="categoryId"
                  value={category.id}
                />

                <button
                  type="submit"
                  disabled={
                    productCount > 0
                  }
                  className="w-full rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {productCount > 0
                    ? "存在产品，无法删除"
                    : "永久删除该分类"}
                </button>
              </form>
            </section>

            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-gray-500">
                创建时间
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-950">
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
                    category.created_at
                  )
                )}
              </p>

              <p className="mt-5 text-sm font-bold text-gray-500">
                最后更新
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-950">
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
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

interface StatusButtonProps {
  categoryId: string;
  status:
    | "draft"
    | "published"
    | "archived";
  label: string;
}

function StatusButton({
  categoryId,
  status,
  label,
}: StatusButtonProps) {
  return (
    <form
      action={updateCategoryStatus}
    >
      <input
        type="hidden"
        name="categoryId"
        value={categoryId}
      />

      <input
        type="hidden"
        name="status"
        value={status}
      />

      <button
        type="submit"
        className="w-full rounded-xl border border-gray-200 px-5 py-3 text-left text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
      >
        {label}
      </button>
    </form>
  );
}