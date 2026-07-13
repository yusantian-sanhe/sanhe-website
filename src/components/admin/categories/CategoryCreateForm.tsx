"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";
import {
  createCategory,
  type CategoryActionState,
} from "@/app/admin/categories/actions";

const initialState: CategoryActionState = {
  success: false,
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

export function CategoryCreateForm() {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createCategory,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="nameEn"
            className="block text-sm font-bold text-gray-700"
          >
            英文名称 *
          </label>

          <input
            id="nameEn"
            name="nameEn"
            type="text"
            required
            disabled={isPending}
            placeholder="Fresh Vegetables"
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="nameZh"
            className="block text-sm font-bold text-gray-700"
          >
            中文名称 *
          </label>

          <input
            id="nameZh"
            name="nameZh"
            type="text"
            required
            disabled={isPending}
            placeholder="新鲜蔬菜"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="descriptionEn"
            className="block text-sm font-bold text-gray-700"
          >
            英文描述
          </label>

          <textarea
            id="descriptionEn"
            name="descriptionEn"
            disabled={isPending}
            placeholder="Fresh vegetables supplied for global markets."
            className={textareaClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="descriptionZh"
            className="block text-sm font-bold text-gray-700"
          >
            中文描述
          </label>

          <textarea
            id="descriptionZh"
            name="descriptionZh"
            disabled={isPending}
            placeholder="面向全球市场供应的新鲜蔬菜产品。"
            className={textareaClassName}
          />
        </div>
      </div>

      <details className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
        <summary className="cursor-pointer font-bold text-gray-950">
          其他语言（目前可暂不填写）
        </summary>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          俄语、阿拉伯语、西班牙语和法语前端尚未完成，可以由办公室后期逐步补充。
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <LanguageFields
            code="Ru"
            language="俄语"
            disabled={isPending}
          />

          <LanguageFields
            code="Ar"
            language="阿拉伯语"
            disabled={isPending}
            direction="rtl"
          />

          <LanguageFields
            code="Es"
            language="西班牙语"
            disabled={isPending}
          />

          <LanguageFields
            code="Fr"
            language="法语"
            disabled={isPending}
          />
        </div>
      </details>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2 md:col-span-1">
          <label
            htmlFor="slug"
            className="block text-sm font-bold text-gray-700"
          >
            Slug *
          </label>

          <input
            id="slug"
            name="slug"
            type="text"
            required
            disabled={isPending}
            placeholder="fresh-vegetables"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            className={inputClassName}
          />

          <p className="text-xs leading-5 text-gray-500">
            只能使用小写字母、数字和连字符，创建后尽量不要修改。
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sortOrder"
            className="block text-sm font-bold text-gray-700"
          >
            排序
          </label>

          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min="0"
            max="9999"
            step="1"
            defaultValue="0"
            disabled={isPending}
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-sm font-bold text-gray-700"
          >
            状态
          </label>

          <select
            id="status"
            name="status"
            defaultValue="draft"
            disabled={isPending}
            className={inputClassName}
          >
            <option value="draft">
              草稿
            </option>

            <option value="published">
              已发布
            </option>
          </select>
        </div>
      </div>

      {state.message && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl border px-5 py-4 text-sm font-bold ${
            state.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-green-800 px-6 py-4 font-bold text-white transition hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending
          ? "正在保存..."
          : "创建产品分类"}
      </button>
    </form>
  );
}

interface LanguageFieldsProps {
  code: "Ru" | "Ar" | "Es" | "Fr";
  language: string;
  disabled: boolean;
  direction?: "ltr" | "rtl";
}

function LanguageFields({
  code,
  language,
  disabled,
  direction = "ltr",
}: LanguageFieldsProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="font-bold text-gray-950">
        {language}
      </h3>

      <div className="mt-5 space-y-5">
        <div className="space-y-2">
          <label
            htmlFor={`name${code}`}
            className="block text-sm font-semibold text-gray-700"
          >
            名称
          </label>

          <input
            id={`name${code}`}
            name={`name${code}`}
            type="text"
            dir={direction}
            disabled={disabled}
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`description${code}`}
            className="block text-sm font-semibold text-gray-700"
          >
            描述
          </label>

          <textarea
            id={`description${code}`}
            name={`description${code}`}
            dir={direction}
            disabled={disabled}
            className={textareaClassName}
          />
        </div>
      </div>
    </div>
  );
}