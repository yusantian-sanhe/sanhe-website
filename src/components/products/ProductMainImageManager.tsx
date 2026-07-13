"use client";

import {
  deleteProductMainImage,
  uploadProductMainImage,
  type ProductMediaActionState,
} from "@/app/admin/products/[id]/media-actions";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";

interface ProductMainImageManagerProps {
  productId: string;
  productName: string;
  mainImagePath: string | null;
  mainImageUrl: string | null;
}

const initialState: ProductMediaActionState = {
  success: false,
  message: "",
};

export function ProductMainImageManager({
  productId,
  productName,
  mainImagePath,
  mainImageUrl,
}: ProductMainImageManagerProps) {
  const uploadFormRef =
    useRef<HTMLFormElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [
    uploadState,
    uploadAction,
    isUploading,
  ] = useActionState(
    uploadProductMainImage,
    initialState
  );

  const [
    deleteState,
    deleteAction,
    isDeleting,
  ] = useActionState(
    deleteProductMainImage,
    initialState
  );

  useEffect(() => {
    if (uploadState.success) {
      uploadFormRef.current?.reset();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [uploadState.success]);

  const isBusy =
    isUploading || isDeleting;

  return (
    <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
        Main Image
      </p>

      <h2 className="mt-3 text-2xl font-bold text-gray-950">
        产品主图
      </h2>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        主图将用于产品列表、产品详情页和社交分享预览。
        支持 JPG、PNG、WebP，单张不超过 5 MB。
      </p>

      <div className="mt-6">
        {mainImageUrl ? (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImageUrl}
                alt={`${productName} main product image`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="border-t border-gray-200 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                当前 Storage 路径
              </p>

              <p className="mt-2 break-all font-mono text-xs leading-5 text-gray-700">
                {mainImagePath}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex aspect-square w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-800">
              ◇
            </div>

            <p className="mt-5 text-lg font-bold text-gray-950">
              暂无产品主图
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              请在下方选择一张产品图片上传。
            </p>
          </div>
        )}
      </div>

      <form
        ref={uploadFormRef}
        action={uploadAction}
        className="mt-7"
      >
        <input
          type="hidden"
          name="productId"
          value={productId}
        />

        <div className="space-y-3">
          <label
            htmlFor={`main-image-${productId}`}
            className="block text-sm font-bold text-gray-700"
          >
            {mainImagePath
              ? "选择新的主图"
              : "选择主图"}
          </label>

          <input
            ref={fileInputRef}
            id={`main-image-${productId}`}
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            disabled={isBusy}
            className="block w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-700 file:me-4 file:border-0 file:bg-green-100 file:px-4 file:py-3.5 file:font-bold file:text-green-800 hover:file:bg-green-200 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="text-xs leading-5 text-gray-500">
            建议上传正方形或接近正方形的高质量产品图片。
          </p>
        </div>

        {uploadState.message && (
          <ActionMessage
            success={uploadState.success}
            message={uploadState.message}
          />
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="mt-5 flex w-full items-center justify-center rounded-2xl bg-green-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading
            ? "正在上传主图..."
            : mainImagePath
              ? "上传并替换主图"
              : "上传产品主图"}
        </button>
      </form>

      {mainImagePath && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm font-bold text-gray-950">
            删除当前主图
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            删除后产品资料将不再引用该图片，Storage
            中对应文件也会被清理。
          </p>

          <form
            action={deleteAction}
            className="mt-4"
          >
            <input
              type="hidden"
              name="productId"
              value={productId}
            />

            <button
              type="submit"
              disabled={isBusy}
              className="flex w-full items-center justify-center rounded-2xl border border-red-200 px-5 py-3.5 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting
                ? "正在删除主图..."
                : "删除当前主图"}
            </button>
          </form>

          {deleteState.message && (
            <ActionMessage
              success={deleteState.success}
              message={deleteState.message}
            />
          )}
        </div>
      )}
    </section>
  );
}

interface ActionMessageProps {
  success: boolean;
  message: string;
}

function ActionMessage({
  success,
  message,
}: ActionMessageProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-bold ${
        success
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}