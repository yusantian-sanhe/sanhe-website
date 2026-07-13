"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CategoryActionState {
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

type CategoryStatus =
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

function isCategoryStatus(
  value: string
): value is CategoryStatus {
  return validStatuses.includes(
    value as CategoryStatus
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
    },
  };
}

interface CategoryValidationError {
  success: false;
  error: string;
}

interface CategoryValidationSuccess {
  success: true;
  slug: string;
  status: CategoryStatus;
  sortOrder: number;
  translations: ReturnType<
    typeof createTranslations
  >;
}

type CategoryValidationResult =
  | CategoryValidationError
  | CategoryValidationSuccess;

function validateCategoryFields(
  formData: FormData
): CategoryValidationResult {
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
    !slug ||
    !englishName ||
    !chineseName
  ) {
    return {
      success: false,
      error:
        "请填写 Slug、英文名称和中文名称。",
    };
  }

  if (!slugPattern.test(slug)) {
    return {
      success: false,
      error:
        "Slug 只能包含小写英文字母、数字和连字符，例如 fresh-vegetables。",
    };
  }

  if (!isCategoryStatus(status)) {
    return {
      success: false,
      error: "分类状态无效。",
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
    slug,
    status,
    sortOrder,
    translations:
      createTranslations(formData),
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

export async function createCategory(
  _previousState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const validation =
    validateCategoryFields(formData);

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

  const { error } = await supabase
    .from("product_categories")
    .insert({
      slug: validation.slug,
      translations:
        validation.translations,
      sort_order:
        validation.sortOrder,
      status: validation.status,
      created_by: user.id,
      updated_by: user.id,
    });

  if (error) {
    console.error(
      "Create category failed:",
      error
    );

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "这个 Slug 已经存在，请使用其他 Slug。",
      };
    }

    return {
      success: false,
      message:
        "分类保存失败，请检查终端中的错误信息。",
    };
  }

  revalidatePath(
    "/admin/categories"
  );

  revalidatePath("/admin");

  return {
    success: true,
    message:
      "产品分类已成功创建。",
  };
}

export async function updateCategory(
  _previousState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const categoryId =
    readText(formData, "categoryId");

  if (!categoryId) {
    return {
      success: false,
      message: "缺少分类编号。",
    };
  }

  const validation =
    validateCategoryFields(formData);

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
    data,
    error,
  } = await supabase
    .from("product_categories")
    .update({
      slug: validation.slug,
      translations:
        validation.translations,
      sort_order:
        validation.sortOrder,
      status: validation.status,
      updated_by: user.id,
    })
    .eq("id", categoryId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Update category failed:",
      error
    );

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "这个 Slug 已被其他分类使用。",
      };
    }

    return {
      success: false,
      message:
        "分类更新失败，请检查终端错误。",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "没有找到该分类，或者当前账号没有编辑权限。",
    };
  }

  revalidatePath(
    "/admin/categories"
  );

  revalidatePath(
    `/admin/categories/${categoryId}`
  );

  revalidatePath("/admin");

  return {
    success: true,
    message:
      "产品分类已成功更新。",
  };
}

export async function updateCategoryStatus(
  formData: FormData
) {
  const categoryId =
    readText(formData, "categoryId");

  const status =
    readText(formData, "status");

  if (
    !categoryId ||
    !isCategoryStatus(status)
  ) {
    redirect(
      "/admin/categories?error=invalid-status"
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
    .from("product_categories")
    .update({
      status,
      updated_by: user.id,
    })
    .eq("id", categoryId);

  if (error) {
    console.error(
      "Update category status failed:",
      error
    );

    redirect(
      `/admin/categories/${categoryId}?error=status`
    );
  }

  revalidatePath(
    "/admin/categories"
  );

  revalidatePath(
    `/admin/categories/${categoryId}`
  );

  revalidatePath("/admin");

  redirect(
    `/admin/categories/${categoryId}?updated=status`
  );
}

export async function deleteCategory(
  formData: FormData
) {
  const categoryId =
    readText(formData, "categoryId");

  if (!categoryId) {
    redirect(
      "/admin/categories?error=invalid-category"
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
    count,
    error: productCountError,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("category_id", categoryId);

  if (productCountError) {
    console.error(
      "Category product count failed:",
      productCountError
    );

    redirect(
      `/admin/categories/${categoryId}?error=count`
    );
  }

  if ((count ?? 0) > 0) {
    redirect(
      `/admin/categories/${categoryId}?error=has-products`
    );
  }

  const { error } = await supabase
    .from("product_categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    console.error(
      "Delete category failed:",
      error
    );

    redirect(
      `/admin/categories/${categoryId}?error=delete`
    );
  }

  revalidatePath(
    "/admin/categories"
  );

  revalidatePath("/admin");

  redirect(
    "/admin/categories?deleted=true"
  );
}