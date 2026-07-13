"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ProductActionState {
  success: boolean;
  message: string;
}

const slugPattern =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const validStatuses = [
  "draft",
  "published",
  "archived",
] as const;

type ProductStatus =
  (typeof validStatuses)[number];

function readText(
  formData: FormData,
  fieldName: string
) {
  const value =
    formData.get(fieldName);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function readBoolean(
  formData: FormData,
  fieldName: string
) {
  return (
    formData.get(fieldName) === "on"
  );
}

function readSortOrder(
  formData: FormData
) {
  const value =
    readText(formData, "sortOrder");

  if (!value) {
    return 0;
  }

  const numberValue =
    Number(value);

  if (
    !Number.isInteger(numberValue) ||
    numberValue < 0 ||
    numberValue > 9999
  ) {
    return null;
  }

  return numberValue;
}

function readLines(
  formData: FormData,
  fieldName: string
) {
  return readText(
    formData,
    fieldName
  )
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isProductStatus(
  value: string
): value is ProductStatus {
  return validStatuses.includes(
    value as ProductStatus
  );
}

function createTranslations(
  formData: FormData
) {
  return {
    en: {
      name: readText(
        formData,
        "nameEn"
      ),
      description: readText(
        formData,
        "descriptionEn"
      ),
      details: readText(
        formData,
        "detailsEn"
      ),
    },

    zh: {
      name: readText(
        formData,
        "nameZh"
      ),
      description: readText(
        formData,
        "descriptionZh"
      ),
      details: readText(
        formData,
        "detailsZh"
      ),
    },

    ru: {
      name: readText(
        formData,
        "nameRu"
      ),
      description: readText(
        formData,
        "descriptionRu"
      ),
      details: readText(
        formData,
        "detailsRu"
      ),
    },

    ar: {
      name: readText(
        formData,
        "nameAr"
      ),
      description: readText(
        formData,
        "descriptionAr"
      ),
      details: readText(
        formData,
        "detailsAr"
      ),
    },

    es: {
      name: readText(
        formData,
        "nameEs"
      ),
      description: readText(
        formData,
        "descriptionEs"
      ),
      details: readText(
        formData,
        "detailsEs"
      ),
    },

    fr: {
      name: readText(
        formData,
        "nameFr"
      ),
      description: readText(
        formData,
        "descriptionFr"
      ),
      details: readText(
        formData,
        "detailsFr"
      ),
    },
  };
}

function createSpecifications(
  formData: FormData
) {
  return {
    en: readLines(
      formData,
      "specificationsEn"
    ),
    zh: readLines(
      formData,
      "specificationsZh"
    ),
    ru: readLines(
      formData,
      "specificationsRu"
    ),
    ar: readLines(
      formData,
      "specificationsAr"
    ),
    es: readLines(
      formData,
      "specificationsEs"
    ),
    fr: readLines(
      formData,
      "specificationsFr"
    ),
  };
}

function createLocalizedValues(
  formData: FormData,
  fieldPrefix: string
) {
  return {
    en: readText(
      formData,
      `${fieldPrefix}En`
    ),
    zh: readText(
      formData,
      `${fieldPrefix}Zh`
    ),
    ru: readText(
      formData,
      `${fieldPrefix}Ru`
    ),
    ar: readText(
      formData,
      `${fieldPrefix}Ar`
    ),
    es: readText(
      formData,
      `${fieldPrefix}Es`
    ),
    fr: readText(
      formData,
      `${fieldPrefix}Fr`
    ),
  };
}

interface ProductValidationError {
  success: false;
  error: string;
}

interface ProductValidationSuccess {
  success: true;
  categoryId: string;
  slug: string;
  status: ProductStatus;
  sortOrder: number;
  featured: boolean;
  translations: ReturnType<
    typeof createTranslations
  >;
  specifications: ReturnType<
    typeof createSpecifications
  >;
  packaging: ReturnType<
    typeof createLocalizedValues
  >;
  moq: ReturnType<
    typeof createLocalizedValues
  >;
  supplyAbility: ReturnType<
    typeof createLocalizedValues
  >;
  loadingCapacity: ReturnType<
    typeof createLocalizedValues
  >;
}

type ProductValidationResult =
  | ProductValidationError
  | ProductValidationSuccess;

function validateProductFields(
  formData: FormData
): ProductValidationResult {
  const categoryId = readText(
    formData,
    "categoryId"
  );

  const slug = readText(
    formData,
    "slug"
  ).toLowerCase();

  const englishName = readText(
    formData,
    "nameEn"
  );

  const chineseName = readText(
    formData,
    "nameZh"
  );

  const status = readText(
    formData,
    "status"
  );

  const sortOrder =
    readSortOrder(formData);

  if (
    !categoryId ||
    !slug ||
    !englishName ||
    !chineseName
  ) {
    return {
      success: false,
      error:
        "请填写产品分类、Slug、英文名称和中文名称。",
    };
  }

  if (!slugPattern.test(slug)) {
    return {
      success: false,
      error:
        "Slug 只能包含小写字母、数字和连字符，例如 fresh-ginger。",
    };
  }

  if (!isProductStatus(status)) {
    return {
      success: false,
      error: "产品状态无效。",
    };
  }

  if (sortOrder === null) {
    return {
      success: false,
      error:
        "排序必须是 0 到 9999 之间的整数。",
    };
  }

  return {
    success: true,
    categoryId,
    slug,
    status,
    sortOrder,
    featured: readBoolean(
      formData,
      "featured"
    ),
    translations:
      createTranslations(formData),
    specifications:
      createSpecifications(formData),
    packaging:
      createLocalizedValues(
        formData,
        "packaging"
      ),
    moq:
      createLocalizedValues(
        formData,
        "moq"
      ),
    supplyAbility:
      createLocalizedValues(
        formData,
        "supplyAbility"
      ),
    loadingCapacity:
      createLocalizedValues(
        formData,
        "loadingCapacity"
      ),
  };
}

async function getAuthenticatedUser() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
  };
}

function createPublishedAt(
  status: ProductStatus,
  currentPublishedAt?: string | null
) {
  if (status !== "published") {
    return null;
  }

  return (
    currentPublishedAt ??
    new Date().toISOString()
  );
}

export async function createProduct(
  _previousState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const validation =
    validateProductFields(formData);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error,
    };
  }

  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  if (!user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录。",
    };
  }

  const {
    data: category,
    error: categoryError,
  } = await supabase
    .from("product_categories")
    .select("id")
    .eq(
      "id",
      validation.categoryId
    )
    .maybeSingle();

  if (
    categoryError ||
    !category
  ) {
    return {
      success: false,
      message:
        "所选产品分类不存在或当前账号无权使用。",
    };
  }

  const {
    data: product,
    error,
  } = await supabase
    .from("products")
    .insert({
      category_id:
        validation.categoryId,
      slug: validation.slug,
      translations:
        validation.translations,
      specifications:
        validation.specifications,
      packaging:
        validation.packaging,
      packaging_options: [],
      moq: validation.moq,
      supply_ability:
        validation.supplyAbility,
      loading_capacity:
        validation.loadingCapacity,
      additional_details: {},
      seo: {},
      main_image_path: null,
      image_paths: [],
      sort_order:
        validation.sortOrder,
      featured:
        validation.featured,
      status:
        validation.status,
      published_at:
        createPublishedAt(
          validation.status
        ),
      created_by: user.id,
      updated_by: user.id,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Create product failed:",
      error
    );

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "这个产品 Slug 已经存在，请使用其他 Slug。",
      };
    }

    if (error.code === "23503") {
      return {
        success: false,
        message:
          "所选产品分类无效，请重新选择。",
      };
    }

    return {
      success: false,
      message:
        "产品保存失败，请检查终端中的 Supabase 错误。",
    };
  }

  if (!product) {
    return {
      success: false,
      message:
        "产品已写入，但无法取得产品编号。",
    };
  }

  revalidatePath(
    "/admin/products"
  );
  revalidatePath("/admin");

  redirect(
    `/admin/products/${product.id}?created=true`
  );
}

export async function updateProduct(
  _previousState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const productId = readText(
    formData,
    "productId"
  );

  if (!productId) {
    return {
      success: false,
      message: "缺少产品编号。",
    };
  }

  const validation =
    validateProductFields(formData);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error,
    };
  }

  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  if (!user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录。",
    };
  }

  const {
    data: currentProduct,
    error: currentProductError,
  } = await supabase
    .from("products")
    .select("id, published_at")
    .eq("id", productId)
    .maybeSingle();

  if (
    currentProductError ||
    !currentProduct
  ) {
    return {
      success: false,
      message:
        "没有找到该产品，或者当前账号无权编辑。",
    };
  }

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .update({
      category_id:
        validation.categoryId,
      slug: validation.slug,
      translations:
        validation.translations,
      specifications:
        validation.specifications,
      packaging:
        validation.packaging,
      moq: validation.moq,
      supply_ability:
        validation.supplyAbility,
      loading_capacity:
        validation.loadingCapacity,
      sort_order:
        validation.sortOrder,
      featured:
        validation.featured,
      status:
        validation.status,
      published_at:
        createPublishedAt(
          validation.status,
          currentProduct.published_at
        ),
      updated_by: user.id,
    })
    .eq("id", productId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Update product failed:",
      error
    );

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "这个产品 Slug 已被其他产品使用。",
      };
    }

    if (error.code === "23503") {
      return {
        success: false,
        message:
          "所选产品分类不存在。",
      };
    }

    return {
      success: false,
      message:
        "产品更新失败，请检查终端中的 Supabase 错误。",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "产品没有更新，或者当前账号没有编辑权限。",
    };
  }

  revalidatePath(
    "/admin/products"
  );
  revalidatePath(
    `/admin/products/${productId}`
  );
  revalidatePath("/admin");

  return {
    success: true,
    message: "产品资料已成功更新。",
  };
}

export async function updateProductStatus(
  formData: FormData
) {
  const productId = readText(
    formData,
    "productId"
  );

  const status = readText(
    formData,
    "status"
  );

  if (
    !productId ||
    !isProductStatus(status)
  ) {
    redirect(
      "/admin/products?error=invalid-status"
    );
  }

  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  const {
    data: currentProduct,
    error: currentProductError,
  } = await supabase
    .from("products")
    .select("published_at")
    .eq("id", productId)
    .maybeSingle();

  if (
    currentProductError ||
    !currentProduct
  ) {
    redirect(
      `/admin/products/${productId}?error=not-found`
    );
  }

  const { error } = await supabase
    .from("products")
    .update({
      status,
      published_at:
        createPublishedAt(
          status,
          currentProduct.published_at
        ),
      updated_by: user.id,
    })
    .eq("id", productId);

  if (error) {
    console.error(
      "Update product status failed:",
      error
    );

    redirect(
      `/admin/products/${productId}?error=status`
    );
  }

  revalidatePath(
    "/admin/products"
  );
  revalidatePath(
    `/admin/products/${productId}`
  );
  revalidatePath("/admin");

  redirect(
    `/admin/products/${productId}?updated=status`
  );
}

export async function deleteProduct(
  formData: FormData
) {
  const productId = readText(
    formData,
    "productId"
  );

  if (!productId) {
    redirect(
      "/admin/products?error=invalid-product"
    );
  }

  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error(
      "Delete product failed:",
      error
    );

    redirect(
      `/admin/products/${productId}?error=delete`
    );
  }

  revalidatePath(
    "/admin/products"
  );
  revalidatePath("/admin");

  redirect(
    "/admin/products?deleted=true"
  );
}