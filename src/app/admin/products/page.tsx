import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type ProductStatus =
  | "draft"
  | "published"
  | "archived";

interface ProductTranslations {
  en?: {
    name?: string;
    description?: string;
    details?: string;
  };

  zh?: {
    name?: string;
    description?: string;
    details?: string;
  };

  ru?: {
    name?: string;
    description?: string;
    details?: string;
  };

  ar?: {
    name?: string;
    description?: string;
    details?: string;
  };

  es?: {
    name?: string;
    description?: string;
    details?: string;
  };

  fr?: {
    name?: string;
    description?: string;
    details?: string;
  };
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
}

interface ProductCategoryRelation {
  id: string;
  slug: string;
  translations: CategoryTranslations;
}

interface ProductRow {
  id: string;
  slug: string;
  translations: ProductTranslations;
  main_image_path: string | null;
  featured: boolean;
  sort_order: number;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  product_categories:
    | ProductCategoryRelation
    | ProductCategoryRelation[]
    | null;
}

interface CategoryOption {
  id: string;
  slug: string;
  translations: CategoryTranslations;
}

interface AdminProductsPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    category?: string;
  }>;
}

function isProductStatus(
  value: string
): value is ProductStatus {
  return [
    "draft",
    "published",
    "archived",
  ].includes(value);
}

function getStatusLabel(
  status: ProductStatus
) {
  const labels: Record<
    ProductStatus,
    string
  > = {
    draft: "草稿",
    published: "已发布",
    archived: "已归档",
  };

  return labels[status];
}

function getStatusClassName(
  status: ProductStatus
) {
  if (status === "published") {
    return "bg-green-50 text-green-700";
  }

  if (status === "archived") {
    return "bg-gray-100 text-gray-600";
  }

  return "bg-amber-50 text-amber-700";
}

function resolveCategory(
  relation:
    | ProductCategoryRelation
    | ProductCategoryRelation[]
    | null
) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function getEnglishCategoryName(
  category: CategoryOption
) {
  return (
    category.translations.en?.name?.trim() ||
    category.slug
  );
}

function getChineseCategoryName(
  category: CategoryOption
) {
  return (
    category.translations.zh?.name?.trim() ||
    "未填写中文名称"
  );
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const filters = await searchParams;

  const searchQuery =
    filters.query?.trim() ?? "";

  const statusFilter =
    filters.status &&
    isProductStatus(filters.status)
      ? filters.status
      : "";

  const categoryFilter =
    filters.category?.trim() ?? "";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    categoriesResult,
    totalCountResult,
    draftCountResult,
    publishedCountResult,
    archivedCountResult,
  ] = await Promise.all([
    supabase
      .from("product_categories")
      .select(
        "id, slug, translations"
      )
      .order("sort_order", {
        ascending: true,
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

    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "archived"),
  ]);

  let productsQuery = supabase
    .from("products")
    .select(`
      id,
      slug,
      translations,
      main_image_path,
      featured,
      sort_order,
      status,
      created_at,
      updated_at,
      product_categories (
        id,
        slug,
        translations
      )
    `)
    .order("sort_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  if (statusFilter) {
    productsQuery =
      productsQuery.eq(
        "status",
        statusFilter
      );
  }

  if (categoryFilter) {
    productsQuery =
      productsQuery.eq(
        "category_id",
        categoryFilter
      );
  }

  const {
    data: rawProducts,
    error: productsError,
  } = await productsQuery;

  const categories =
    (categoriesResult.data ??
      []) as CategoryOption[];

  const products =
    (rawProducts ?? []) as ProductRow[];

  const normalizedSearchQuery =
    searchQuery.toLowerCase();

  const filteredProducts =
    normalizedSearchQuery
      ? products.filter((product) => {
          const englishName =
            product.translations.en?.name
              ?.trim()
              .toLowerCase() ?? "";

          const chineseName =
            product.translations.zh?.name
              ?.trim()
              .toLowerCase() ?? "";

          return (
            product.slug
              .toLowerCase()
              .includes(
                normalizedSearchQuery
              ) ||
            englishName.includes(
              normalizedSearchQuery
            ) ||
            chineseName.includes(
              normalizedSearchQuery
            )
          );
        })
      : products;

  const statistics = [
    {
      label: "全部产品",
      value:
        totalCountResult.count ?? 0,
      href: "/admin/products",
    },
    {
      label: "草稿",
      value:
        draftCountResult.count ?? 0,
      href:
        "/admin/products?status=draft",
    },
    {
      label: "已发布",
      value:
        publishedCountResult.count ?? 0,
      href:
        "/admin/products?status=published",
    },
    {
      label: "已归档",
      value:
        archivedCountResult.count ?? 0,
      href:
        "/admin/products?status=archived",
    },
  ];

  const hasQueryError =
    Boolean(productsError) ||
    Boolean(categoriesResult.error);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-950">
              产品管理
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
            >
              ← 返回后台首页
            </Link>

            <Link
              href="/admin/products/new"
              className="rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-900"
            >
              ＋ 新增产品
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Products Management
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            管理产品资料
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-green-100">
            管理产品分类、名称、规格、包装、贸易信息、发布状态和推荐排序。
            当前前台仍然读取原有 TypeScript
            数据，后台录入不会立即影响正式网站。
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
            >
              <p className="text-sm font-bold text-gray-500">
                {item.label}
              </p>

              <p className="mt-3 text-4xl font-extrabold text-gray-950">
                {item.value}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              Filters
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-950">
              搜索和筛选
            </h2>
          </div>

          <form
            method="get"
            className="mt-6 grid gap-4 lg:grid-cols-[1fr_240px_240px_auto]"
          >
            <div>
              <label
                htmlFor="query"
                className="sr-only"
              >
                搜索产品
              </label>

              <input
                id="query"
                name="query"
                type="search"
                defaultValue={searchQuery}
                placeholder="搜索英文名、中文名或 Slug"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="sr-only"
              >
                状态
              </label>

              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-100"
              >
                <option value="">
                  全部状态
                </option>

                <option value="draft">
                  草稿
                </option>

                <option value="published">
                  已发布
                </option>

                <option value="archived">
                  已归档
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="sr-only"
              >
                产品分类
              </label>

              <select
                id="category"
                name="category"
                defaultValue={
                  categoryFilter
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-100"
              >
                <option value="">
                  全部分类
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {getEnglishCategoryName(
                        category
                      )}
                      {" / "}
                      {getChineseCategoryName(
                        category
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-green-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-900"
              >
                筛选
              </button>

              <Link
                href="/admin/products"
                className="flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                重置
              </Link>
            </div>
          </form>
        </section>

        {hasQueryError && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
            产品或分类数据读取失败，请检查终端中的 Supabase 错误日志。
          </div>
        )}

        <section className="mt-8 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                Product List
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-950">
                产品列表
              </h2>
            </div>

            <p className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
              当前显示{" "}
              {filteredProducts.length} 个
            </p>
          </div>

          {!hasQueryError &&
            filteredProducts.length ===
              0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                <p className="text-2xl font-bold text-gray-950">
                  暂无符合条件的产品
                </p>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
                  如果数据库尚未录入产品，这是正常状态。下一步我们会建立完整的新增产品表单。
                </p>

                <Link
                  href="/admin/products/new"
                  className="mt-7 inline-flex rounded-2xl bg-green-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-green-900"
                >
                  创建第一个产品
                </Link>
              </div>
            )}

          {!hasQueryError &&
            filteredProducts.length >
              0 && (
              <div className="mt-8 space-y-4">
                {filteredProducts.map(
                  (product) => {
                    const category =
                      resolveCategory(
                        product.product_categories
                      );

                    const englishName =
                      product.translations.en
                        ?.name?.trim() ||
                      "Unnamed Product";

                    const chineseName =
                      product.translations.zh
                        ?.name?.trim() ||
                      "未填写中文名称";

                    const categoryName =
                      category?.translations.en
                        ?.name?.trim() ||
                      category?.slug ||
                      "未分配分类";

                    return (
                      <article
                        key={product.id}
                        className="rounded-3xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/40"
                      >
                        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-xl font-bold text-gray-950">
                                {englishName}
                              </h3>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClassName(
                                  product.status
                                )}`}
                              >
                                {getStatusLabel(
                                  product.status
                                )}
                              </span>

                              {product.featured && (
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                  首页推荐
                                </span>
                              )}
                            </div>

                            <p className="mt-2 font-semibold text-gray-700">
                              {chineseName}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                              <span>
                                分类：
                                {categoryName}
                              </span>

                              <span className="font-mono">
                                /{product.slug}
                              </span>

                              <span>
                                排序：
                                {
                                  product.sort_order
                                }
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
                            >
                              编辑产品 →
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}