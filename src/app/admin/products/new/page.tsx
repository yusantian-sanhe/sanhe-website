import { ProductCreateForm } from "@/components/admin/products/ProductCreateForm";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic =
  "force-dynamic";

type CategoryStatus =
  | "draft"
  | "published"
  | "archived";

interface CategoryTranslations {
  en?: {
    name?: string;
    description?: string;
  };

  zh?: {
    name?: string;
    description?: string;
  };
}

interface CategoryRow {
  id: string;
  slug: string;
  translations:
    CategoryTranslations;
  status: CategoryStatus;
}

export default async function NewProductPage() {
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
      "id, slug, translations, status"
    )
    .neq("status", "archived")
    .order("sort_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  const categories =
    ((data ?? []) as CategoryRow[])
      .map((category) => ({
        id: category.id,
        slug: category.slug,

        englishName:
          category.translations.en
            ?.name?.trim() ||
          category.slug,

        chineseName:
          category.translations.zh
            ?.name?.trim() ||
          "未填写中文名称",

        status: category.status,
      }));

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-950">
              新增产品
            </h1>
          </div>

          <Link
            href="/admin/products"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
          >
            ← 返回产品列表
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            New Product
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            创建新产品
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-green-100">
            先建立产品的核心内容和贸易信息。
            创建完成后，再继续上传图片、完善包装选项、SEO 和扩展资料。
          </p>
        </section>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">
            产品分类读取失败，请检查终端中的 Supabase 错误。
          </div>
        )}

        {!error &&
          categories.length === 0 && (
          <section className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-7">
            <h2 className="text-2xl font-bold text-amber-900">
              暂时无法新增产品
            </h2>

            <p className="mt-4 leading-7 text-amber-800">
              数据库中还没有可用的产品分类。
              请先创建至少一个分类，再返回新增产品页面。
            </p>

            <Link
              href="/admin/categories"
              className="mt-6 inline-flex rounded-2xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
            >
              前往产品分类管理
            </Link>
          </section>
        )}

        {!error &&
          categories.length > 0 && (
          <div className="mt-8">
            <ProductCreateForm
              categories={categories}
            />
          </div>
        )}
      </div>
    </main>
  );
}