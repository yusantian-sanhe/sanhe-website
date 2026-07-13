"use client";

import {
  deleteProductGalleryImage,
  uploadProductGalleryImages,
  type ProductMediaActionState,
} from "@/app/admin/products/[id]/media-actions";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";

interface GalleryImage {
  path: string;
  url: string;
}

interface ProductGalleryManagerProps {
  productId: string;
  productName: string;
  images: GalleryImage[];
  maximumImages?: number;
}

const initialState: ProductMediaActionState = {
  success: false,
  message: "",
};

export function ProductGalleryManager({
  productId,
  productName,
  images,
  maximumImages = 8,
}: ProductGalleryManagerProps) {
  const uploadFormRef =
    useRef<HTMLFormElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [
    uploadState,
    uploadAction,
    isUploading,
  ] = useActionState(
    uploadProductGalleryImages,
    initialState
  );

  const [
    deleteState,
    deleteAction,
    isDeleting,
  ] = useActionState(
    deleteProductGalleryImage,
    initialState
  );

  useEffect(() => {
    if (!uploadState.success) {
      return;
    }

    uploadFormRef.current?.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [uploadState.success]);

  const currentImageCount =
    images.length;

  const remainingSlots =
    Math.max(
      maximumImages - currentImageCount,
      0
    );

  const isGalleryFull =
    remainingSlots === 0;

  const isBusy =
    isUploading || isDeleting;

  return (
    <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Product Gallery
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-950">
            产品图库
          </h2>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-bold ${
            isGalleryFull
              ? "bg-amber-50 text-amber-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {currentImageCount} /{" "}
          {maximumImages}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        图库图片将用于产品详情页的多图浏览。
        支持 JPG、PNG 和 WebP，单张不超过
        5 MB。
      </p>

      {images.length > 0 ? (
        <div className="mt-7 grid grid-cols-2 gap-4">
          {images.map(
            (image, index) => (
              <GalleryImageCard
                key={image.path}
                productId={productId}
                productName={
                  productName
                }
                image={image}
                index={index}
                deleteAction={
                  deleteAction
                }
                disabled={isBusy}
              />
            )
          )}
        </div>
      ) : (
        <div className="mt-7 flex min-h-52 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-800">
            ▧
          </div>

          <p className="mt-5 text-lg font-bold text-gray-950">
            暂无图库图片
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            上传多张不同角度、包装方式或产品细节图片，帮助采购商了解产品。
          </p>
        </div>
      )}

      {deleteState.message && (
        <ActionMessage
          success={deleteState.success}
          message={deleteState.message}
        />
      )}

      <div className="mt-7 border-t border-gray-200 pt-7">
        <h3 className="font-bold text-gray-950">
          上传图库图片
        </h3>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          {isGalleryFull
            ? `图库已达到 ${maximumImages} 张上限，请先删除图片。`
            : `还可以上传 ${remainingSlots} 张图片。`}
        </p>

        <form
          ref={uploadFormRef}
          action={uploadAction}
          className="mt-5"
        >
          <input
            type="hidden"
            name="productId"
            value={productId}
          />

          <input
            ref={fileInputRef}
            id={`gallery-images-${productId}`}
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            required
            disabled={
              isBusy ||
              isGalleryFull
            }
            className="block w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-700 file:me-4 file:border-0 file:bg-blue-100 file:px-4 file:py-3.5 file:font-bold file:text-blue-800 hover:file:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="mt-3 rounded-2xl bg-gray-50 px-4 py-3">
            <ul className="space-y-1 text-xs leading-5 text-gray-500">
              <li>
                • 一次可以选择多张图片
              </li>
              <li>
                • 建议使用清晰、接近正方形的产品照片
              </li>
              <li>
                • 上传数量不能超过剩余图库位置
              </li>
            </ul>
          </div>

          {uploadState.message && (
            <ActionMessage
              success={
                uploadState.success
              }
              message={
                uploadState.message
              }
            />
          )}

          <button
            type="submit"
            disabled={
              isBusy ||
              isGalleryFull
            }
            className="mt-5 flex w-full items-center justify-center rounded-2xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading
              ? "正在上传图库图片..."
              : isGalleryFull
                ? "图库已满"
                : "上传图库图片"}
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
        <p className="text-xs font-semibold leading-5 text-amber-800">
          当前图片按照上传顺序显示。拖动排序与设置图库封面将在下一阶段加入。
        </p>
      </div>
    </section>
  );
}

interface GalleryImageCardProps {
  productId: string;
  productName: string;
  image: GalleryImage;
  index: number;
  deleteAction: (
    formData: FormData
  ) => void;
  disabled: boolean;
}

function GalleryImageCard({
  productId,
  productName,
  image,
  index,
  deleteAction,
  disabled,
}: GalleryImageCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={`${productName} gallery image ${
            index + 1
          }`}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
          {index + 1}
        </span>
      </div>

      <div className="p-3">
        <p
          title={image.path}
          className="truncate font-mono text-[11px] text-gray-500"
        >
          {image.path}
        </p>

        <form
          action={deleteAction}
          className="mt-3"
        >
          <input
            type="hidden"
            name="productId"
            value={productId}
          />

          <input
            type="hidden"
            name="imagePath"
            value={image.path}
          />

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled
              ? "处理中..."
              : "删除图片"}
          </button>
        </form>
      </div>
    </article>
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