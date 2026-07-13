"use server";

import {
  PRODUCT_MEDIA_BUCKET,
  createProductMediaPath,
  isProductMediaPath,
  validateProductMediaFile,
} from "@/lib/supabase/storage";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface ProductMediaActionState {
  success: boolean;
  message: string;
}

const MAX_GALLERY_IMAGES = 8;

function readText(
  formData: FormData,
  fieldName: string
) {
  const value = formData.get(fieldName);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizeImagePaths(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

async function getAuthenticatedContext() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
    authError: error,
  };
}

function revalidateProductMediaPages(
  productId: string
) {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath(
    `/admin/products/${productId}`
  );
}

async function removeStorageFiles(
  paths: string[]
) {
  if (paths.length === 0) {
    return;
  }

  const supabase = await createClient();

  const safePaths = paths.filter(
    isProductMediaPath
  );

  if (safePaths.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(PRODUCT_MEDIA_BUCKET)
    .remove(safePaths);

  if (error) {
    console.error(
      "Storage cleanup failed:",
      error
    );
  }
}

/**
 * Uploads or replaces the main image
 * for one product.
 */
export async function uploadProductMainImage(
  _previousState: ProductMediaActionState,
  formData: FormData
): Promise<ProductMediaActionState> {
  const productId = readText(
    formData,
    "productId"
  );

  const fileValue =
    formData.get("image");

  if (!productId) {
    return {
      success: false,
      message: "缺少产品编号。",
    };
  }

  if (!(fileValue instanceof File)) {
    return {
      success: false,
      message: "请选择一张产品图片。",
    };
  }

  const validation =
    validateProductMediaFile(fileValue);

  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
    };
  }

  const {
    supabase,
    user,
    authError,
  } = await getAuthenticatedContext();

  if (authError || !user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录后台。",
    };
  }

  const {
    data: product,
    error: productError,
  } = await supabase
    .from("products")
    .select("id, main_image_path")
    .eq("id", productId)
    .maybeSingle<{
      id: string;
      main_image_path: string | null;
    }>();

  if (productError || !product) {
    console.error(
      "Product media lookup failed:",
      productError
    );

    return {
      success: false,
      message:
        "没有找到该产品，或者当前账号没有访问权限。",
    };
  }

  let newImagePath: string;

  try {
    newImagePath =
      createProductMediaPath({
        productId,
        file: fileValue,
        role: "main",
      });
  } catch (error) {
    console.error(
      "Create product media path failed:",
      error
    );

    return {
      success: false,
      message:
        "无法生成安全的图片路径。",
    };
  }

  let fileBody: Uint8Array;

  try {
    fileBody = new Uint8Array(
      await fileValue.arrayBuffer()
    );
  } catch (error) {
    console.error(
      "Read product image failed:",
      error
    );

    return {
      success: false,
      message:
        "无法读取所选图片，请重新选择。",
    };
  }

  const { error: uploadError } =
    await supabase.storage
      .from(PRODUCT_MEDIA_BUCKET)
      .upload(
        newImagePath,
        fileBody,
        {
          contentType: fileValue.type,
          cacheControl: "31536000",
          upsert: false,
        }
      );

  if (uploadError) {
    console.error(
      "Product main image upload failed:",
      uploadError
    );

    return {
      success: false,
      message:
        "图片上传失败，请检查文件格式、大小和 Storage 权限。",
    };
  }

  const {
    data: updatedProduct,
    error: updateError,
  } = await supabase
    .from("products")
    .update({
      main_image_path: newImagePath,
      updated_by: user.id,
    })
    .eq("id", productId)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedProduct) {
    console.error(
      "Update product main image path failed:",
      updateError
    );

    await removeStorageFiles([
      newImagePath,
    ]);

    return {
      success: false,
      message:
        "图片已上传，但产品资料更新失败，系统已尝试撤销上传。",
    };
  }

  const previousImagePath =
    product.main_image_path;

  if (
    previousImagePath &&
    previousImagePath !== newImagePath &&
    isProductMediaPath(
      previousImagePath
    )
  ) {
    await removeStorageFiles([
      previousImagePath,
    ]);
  }

  revalidateProductMediaPages(
    productId
  );

  return {
    success: true,
    message: "产品主图已成功上传。",
  };
}

/**
 * Removes the current main image from
 * both the product record and Storage.
 */
export async function deleteProductMainImage(
  _previousState: ProductMediaActionState,
  formData: FormData
): Promise<ProductMediaActionState> {
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

  const {
    supabase,
    user,
    authError,
  } = await getAuthenticatedContext();

  if (authError || !user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录后台。",
    };
  }

  const {
    data: product,
    error: productError,
  } = await supabase
    .from("products")
    .select("id, main_image_path")
    .eq("id", productId)
    .maybeSingle<{
      id: string;
      main_image_path: string | null;
    }>();

  if (productError || !product) {
    console.error(
      "Product media lookup failed:",
      productError
    );

    return {
      success: false,
      message:
        "没有找到该产品，或者当前账号没有访问权限。",
    };
  }

  const currentImagePath =
    product.main_image_path;

  if (!currentImagePath) {
    return {
      success: true,
      message: "该产品目前没有主图。",
    };
  }

  const {
    data: updatedProduct,
    error: updateError,
  } = await supabase
    .from("products")
    .update({
      main_image_path: null,
      updated_by: user.id,
    })
    .eq("id", productId)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedProduct) {
    console.error(
      "Clear product main image failed:",
      updateError
    );

    return {
      success: false,
      message:
        "无法从产品资料中移除主图。",
    };
  }

  if (
    isProductMediaPath(
      currentImagePath
    )
  ) {
    await removeStorageFiles([
      currentImagePath,
    ]);
  }

  revalidateProductMediaPages(
    productId
  );

  return {
    success: true,
    message: "产品主图已成功删除。",
  };
}

/**
 * Uploads one or more gallery images.
 *
 * The product gallery is limited to eight
 * images in total for the current CMS version.
 */
export async function uploadProductGalleryImages(
  _previousState: ProductMediaActionState,
  formData: FormData
): Promise<ProductMediaActionState> {
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

  const selectedFiles = formData
    .getAll("images")
    .filter(
      (value): value is File =>
        value instanceof File &&
        value.size > 0
    );

  if (selectedFiles.length === 0) {
    return {
      success: false,
      message:
        "请至少选择一张图库图片。",
    };
  }

  const {
    supabase,
    user,
    authError,
  } = await getAuthenticatedContext();

  if (authError || !user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录后台。",
    };
  }

  const {
    data: product,
    error: productError,
  } = await supabase
    .from("products")
    .select("id, image_paths")
    .eq("id", productId)
    .maybeSingle<{
      id: string;
      image_paths: unknown;
    }>();

  if (productError || !product) {
    console.error(
      "Product gallery lookup failed:",
      productError
    );

    return {
      success: false,
      message:
        "没有找到该产品，或者当前账号没有访问权限。",
    };
  }

  const currentImagePaths =
    normalizeImagePaths(
      product.image_paths
    );

  const remainingSlots =
    MAX_GALLERY_IMAGES -
    currentImagePaths.length;

  if (remainingSlots <= 0) {
    return {
      success: false,
      message:
        `产品图库最多允许 ${MAX_GALLERY_IMAGES} 张图片。`,
    };
  }

  if (
    selectedFiles.length >
    remainingSlots
  ) {
    return {
      success: false,
      message:
        `当前还可以上传 ${remainingSlots} 张图片，请减少选择数量。`,
    };
  }

  for (const file of selectedFiles) {
    const validation =
      validateProductMediaFile(file);

    if (!validation.valid) {
      return {
        success: false,
        message:
          `${file.name}：${validation.message}`,
      };
    }
  }

  const uploadedPaths: string[] =
    [];

  for (const file of selectedFiles) {
    let newImagePath: string;

    try {
      newImagePath =
        createProductMediaPath({
          productId,
          file,
          role: "gallery",
        });
    } catch (error) {
      console.error(
        "Create gallery path failed:",
        error
      );

      await removeStorageFiles(
        uploadedPaths
      );

      return {
        success: false,
        message:
          "无法生成安全的图库图片路径。",
      };
    }

    let fileBody: Uint8Array;

    try {
      fileBody = new Uint8Array(
        await file.arrayBuffer()
      );
    } catch (error) {
      console.error(
        "Read gallery image failed:",
        error
      );

      await removeStorageFiles(
        uploadedPaths
      );

      return {
        success: false,
        message:
          `无法读取图片 ${file.name}。`,
      };
    }

    const { error: uploadError } =
      await supabase.storage
        .from(PRODUCT_MEDIA_BUCKET)
        .upload(
          newImagePath,
          fileBody,
          {
            contentType: file.type,
            cacheControl: "31536000",
            upsert: false,
          }
        );

    if (uploadError) {
      console.error(
        "Gallery image upload failed:",
        uploadError
      );

      await removeStorageFiles(
        uploadedPaths
      );

      return {
        success: false,
        message:
          `图片 ${file.name} 上传失败，系统已撤销本次已上传文件。`,
      };
    }

    uploadedPaths.push(
      newImagePath
    );
  }

  const nextImagePaths = [
    ...currentImagePaths,
    ...uploadedPaths,
  ];

  const {
    data: updatedProduct,
    error: updateError,
  } = await supabase
    .from("products")
    .update({
      image_paths: nextImagePaths,
      updated_by: user.id,
    })
    .eq("id", productId)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedProduct) {
    console.error(
      "Update gallery paths failed:",
      updateError
    );

    await removeStorageFiles(
      uploadedPaths
    );

    return {
      success: false,
      message:
        "图库图片已上传，但产品资料更新失败，系统已撤销本次上传。",
    };
  }

  revalidateProductMediaPages(
    productId
  );

  return {
    success: true,
    message:
      `已成功上传 ${uploadedPaths.length} 张图库图片。`,
  };
}

/**
 * Deletes one gallery image.
 */
export async function deleteProductGalleryImage(
  _previousState: ProductMediaActionState,
  formData: FormData
): Promise<ProductMediaActionState> {
  const productId = readText(
    formData,
    "productId"
  );

  const imagePath = readText(
    formData,
    "imagePath"
  );

  if (!productId || !imagePath) {
    return {
      success: false,
      message:
        "缺少产品编号或图片路径。",
    };
  }

  if (!isProductMediaPath(imagePath)) {
    return {
      success: false,
      message:
        "图片路径无效，已拒绝删除。",
    };
  }

  const {
    supabase,
    user,
    authError,
  } = await getAuthenticatedContext();

  if (authError || !user) {
    return {
      success: false,
      message:
        "登录状态已失效，请重新登录后台。",
    };
  }

  const {
    data: product,
    error: productError,
  } = await supabase
    .from("products")
    .select("id, image_paths")
    .eq("id", productId)
    .maybeSingle<{
      id: string;
      image_paths: unknown;
    }>();

  if (productError || !product) {
    console.error(
      "Product gallery lookup failed:",
      productError
    );

    return {
      success: false,
      message:
        "没有找到该产品，或者当前账号没有访问权限。",
    };
  }

  const currentImagePaths =
    normalizeImagePaths(
      product.image_paths
    );

  if (
    !currentImagePaths.includes(
      imagePath
    )
  ) {
    return {
      success: false,
      message:
        "该图片不在当前产品图库中。",
    };
  }

  const nextImagePaths =
    currentImagePaths.filter(
      (path) => path !== imagePath
    );

  const {
    data: updatedProduct,
    error: updateError,
  } = await supabase
    .from("products")
    .update({
      image_paths: nextImagePaths,
      updated_by: user.id,
    })
    .eq("id", productId)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedProduct) {
    console.error(
      "Remove gallery path failed:",
      updateError
    );

    return {
      success: false,
      message:
        "无法从产品资料中移除该图片。",
    };
  }

  await removeStorageFiles([
    imagePath,
  ]);

  revalidateProductMediaPages(
    productId
  );

  return {
    success: true,
    message:
      "图库图片已成功删除。",
  };
}