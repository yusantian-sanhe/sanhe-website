export const PRODUCT_MEDIA_BUCKET =
  "product-media";

export const PRODUCT_MEDIA_MAX_FILE_SIZE =
  5 * 1024 * 1024;

export const PRODUCT_MEDIA_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

type AllowedProductMediaType =
  (typeof PRODUCT_MEDIA_ALLOWED_TYPES)[number];

const extensionByMimeType: Record<
  AllowedProductMediaType,
  string
> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export interface ProductMediaValidationResult {
  valid: boolean;
  message: string;
}

function isAllowedProductMediaType(
  mimeType: string
): mimeType is AllowedProductMediaType {
  return PRODUCT_MEDIA_ALLOWED_TYPES.includes(
    mimeType as AllowedProductMediaType
  );
}

function normalizePathSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUniqueId() {
  return crypto.randomUUID();
}

export function validateProductMediaFile(
  file: File
): ProductMediaValidationResult {
  if (!(file instanceof File)) {
    return {
      valid: false,
      message: "没有检测到有效的图片文件。",
    };
  }

  if (file.size <= 0) {
    return {
      valid: false,
      message: "图片文件为空，请重新选择。",
    };
  }

  if (
    file.size >
    PRODUCT_MEDIA_MAX_FILE_SIZE
  ) {
    return {
      valid: false,
      message:
        "图片不能超过 5 MB，请压缩后重新上传。",
    };
  }

  if (
    !isAllowedProductMediaType(
      file.type
    )
  ) {
    return {
      valid: false,
      message:
        "只支持 JPG、PNG 和 WebP 图片。",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function createProductMediaPath({
  productId,
  file,
  role = "gallery",
}: {
  productId: string;
  file: File;
  role?: "main" | "gallery";
}) {
  if (
    !isAllowedProductMediaType(
      file.type
    )
  ) {
    throw new Error(
      "Unsupported product media MIME type."
    );
  }

  const normalizedProductId =
    normalizePathSegment(productId);

  if (!normalizedProductId) {
    throw new Error(
      "A valid product ID is required."
    );
  }

  const extension =
    extensionByMimeType[file.type];

  const uniqueId =
    createUniqueId();

  const filename =
    role === "main"
      ? `main-${uniqueId}.${extension}`
      : `gallery-${uniqueId}.${extension}`;

  return `${normalizedProductId}/${filename}`;
}

export function getProductMediaPublicUrl({
  supabaseUrl,
  path,
}: {
  supabaseUrl: string;
  path: string;
}) {
  const normalizedSupabaseUrl =
    supabaseUrl.replace(/\/$/, "");

  const normalizedPath =
    path.replace(/^\/+/, "");

  return (
    `${normalizedSupabaseUrl}` +
    `/storage/v1/object/public/` +
    `${PRODUCT_MEDIA_BUCKET}/` +
    normalizedPath
  );
}

export function getProductMediaPathFromUrl(
  publicUrl: string
) {
  const marker =
    `/storage/v1/object/public/` +
    `${PRODUCT_MEDIA_BUCKET}/`;

  const markerIndex =
    publicUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const path =
    publicUrl.slice(
      markerIndex + marker.length
    );

  return path || null;
}

export function isProductMediaPath(
  path: string
) {
  const normalizedPath =
    path.trim().replace(/^\/+/, "");

  return (
    normalizedPath.length > 0 &&
    !normalizedPath.includes("..") &&
    /^[a-z0-9-]+\/[a-z0-9-]+\.(jpg|png|webp)$/.test(
      normalizedPath
    )
  );
}