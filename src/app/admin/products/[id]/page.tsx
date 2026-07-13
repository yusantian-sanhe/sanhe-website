import {
  deleteProduct,
  updateProductStatus,
} from "@/app/admin/products/actions";
import { ProductEditForm } from "@/components/admin/products/ProductEditForm";
import { ProductMainImageManager } from "@/components/admin/products/ProductMainImageManager";
import { createClient } from "@/lib/supabase/server";
import { getProductMediaPublicUrl } from "@/lib/supabase/storage";
import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

export const dynamic = "force-dynamic";

interface ProductEditPageProps {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    created?: string;
    updated?: string;
    error?: string;
  }>;
}

type ProductStatus =
  | "draft"
  | "published"
  | "archived";

interface ProductTranslationValue {
  name?: string;
  description?: string;
  details?: string;
}

interface ProductTranslations {
  en?: ProductTranslationValue;
  zh?: ProductTranslationValue;
  ru?: ProductTranslationValue;
  ar?: ProductTranslationValue;
  es?: ProductTranslationValue;
  fr?: ProductTranslationValue;
}

interface LocalizedStringValues {
  en?: string;
  zh?: string;
  ru?: string;
  ar?: string;
  es?: string;
  fr?: string;
}

interface LocalizedArrayValues {
  en?: string[];
  zh?: string[];
  ru?: string[];
  ar?: string[];
  es?: string[];
  fr?: string[];
}

interface ProductRow {
  id: string;
  category_id: string;
  slug: string;

  translations: ProductTranslations;

  specifications: LocalizedArrayValues;

  packaging: LocalizedStringValues;
  moq: LocalizedStringValues;

  supply_ability: LocalizedStringValues;

  loading_capacity: LocalizedStringValues;

  main_image_path: string | null;

  image_paths: string[];

  featured: boolean;

  sort_order: number;

  status: ProductStatus;

  published_at: string | null;

  created_at: string;

  updated_at: string;
}

interface CategoryRow {
  id: string;

  translations: {
    en?: {
      name?: string;
    };

    zh?: {
      name?: string;
    };
  };

  status: ProductStatus;
}

function getErrorMessage(
  error?: string
) {
  if (error === "status") {
    return "产品状态修改失败。";
  }

  if (error === "delete") {
    return "产品删除失败，请查看终端错误。";
  }

  if (error === "not-found") {
    return "没有找到该产品。";
  }

  return "";
}

function getMainImageUrl(
  mainImagePath: string | null
) {
  if (!mainImagePath) {
    return null;
  }

  if (
    mainImagePath.startsWith("http://") ||
    mainImagePath.startsWith("https://")
  ) {
    return mainImagePath;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );

    return null;
  }

  return getProductMediaPublicUrl({
    supabaseUrl,
    path: mainImagePath,
  });
}

export default async function ProductEditPage({
  params,
  searchParams,
}: ProductEditPageProps) {
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
    productResult,
    categoriesResult,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle(),

    supabase
      .from("product_categories")
      .select(
        "id, translations, status"
      )
      .neq("status", "archived")
      .order("sort_order", {
        ascending: true,
      }),
  ]);

  if (
    productResult.error ||
    !productResult.data
  ) {
    if (productResult.error) {
      console.error(
        "Read product failed:",
        productResult.error
      );
    }

    notFound();
  }

  if (categoriesResult.error) {
    console.error(
      "Read product categories failed:",
      categoriesResult.error
    );
  }

  const product =
    productResult.data as ProductRow;

  const categories =
    (categoriesResult.data ??
      []) as CategoryRow[];

  const englishName =
    product.translations.en
      ?.name?.trim() ||
    "Unnamed Product";

  const chineseName =
    product.translations.zh
      ?.name?.trim() ||
    "未填写中文名称";

  const errorMessage =
    getErrorMessage(query.error);

  const mainImageUrl =
    getMainImageUrl(
      product.main_image_path
    );

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
              SanHe CMS
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-950">
              编辑产品
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

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="rounded-[32px] bg-green-900 px-7 py-10 text-white shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Edit Product
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            {englishName}
          </h2>

          <p className="mt-3 text-xl font-semibold text-green-100">
            {chineseName}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              /{product.slug}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              状态：{product.status}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              {product.main_image_path
                ? "主图已上传"
                : "尚未上传主图"}
            </span>
          </div>
        </section>

        {query.created === "true" && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-bold text-green-800">
            产品已成功创建，现在可以继续完善资料并上传产品主图。
          </div>
        )}

        {query.updated ===
          "status" && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-bold text-green-800">
            产品状态已成功修改。
          </div>
        )}

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_360px] xl:items-start">
          <section>
            <ProductEditForm
              product={{
                id: product.id,

                categoryId:
                  product.category_id,

                slug: product.slug,

                status:
                  product.status,

                sortOrder:
                  product.sort_order,

                featured:
                  product.featured,

                translations:
                  product.translations,

                specifications:
                  product.specifications,

                packaging:
                  product.packaging,

                moq:
                  product.moq,

                supplyAbility:
                  product.supply_ability,

                loadingCapacity:
                  product.loading_capacity,
              }}
              categories={categories.map(
                (category) => ({
                  id: category.id,

                  englishName:
                    category.translations.en
                      ?.name?.trim() ||
                    "Unnamed Category",

                  chineseName:
                    category.translations.zh
                      ?.name?.trim() ||
                    "未填写中文名称",

                  status:
                    category.status,
                })
              )}
            />
          </section>

          <aside className="space-y-6 xl:sticky xl:top-8">
            <ProductMainImageManager
              productId={product.id}
              productName={englishName}
              mainImagePath={
                product.main_image_path
              }
              mainImageUrl={mainImageUrl}
            />

            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                Quick Status
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-950">
                快速修改状态
              </h2>

              <div className="mt-6 grid gap-3">
                <StatusButton
                  productId={product.id}
                  status="draft"
                  label="设为草稿"
                />

                <StatusButton
                  productId={product.id}
                  status="published"
                  label="发布产品"
                />

                <StatusButton
                  productId={product.id}
                  status="archived"
                  label="归档产品"
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                Gallery
              </p>

              <h2 className="mt-3 text-xl font-bold text-gray-950">
                产品图库
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                多图上传、删除和排序将在主图功能验证成功后继续加入。
              </p>

              <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
                当前图库图片：
                {product.image_paths?.length ??
                  0} 张
              </p>
            </section>

            <section className="rounded-[28px] border border-red-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-700">
                Danger Zone
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-950">
                删除产品
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                删除后无法恢复。正式产品建议优先使用“归档”，只有测试产品才建议永久删除。
              </p>

              <form
                action={deleteProduct}
                className="mt-6"
              >
                <input
                  type="hidden"
                  name="productId"
                  value={product.id}
                />

                <button
                  type="submit"
                  className="w-full rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50"
                >
                  永久删除该产品
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
                    product.created_at
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
                    product.updated_at
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
  productId: string;

  status: ProductStatus;

  label: string;
}

function StatusButton({
  productId,
  status,
  label,
}: StatusButtonProps) {
  return (
    <form action={updateProductStatus}>
      <input
        type="hidden"
        name="productId"
        value={productId}
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