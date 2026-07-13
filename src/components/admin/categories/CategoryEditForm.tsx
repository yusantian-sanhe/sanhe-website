"use client";

import {
  useActionState,
} from "react";
import {
  updateCategory,
  type CategoryActionState,
} from "@/app/admin/categories/actions";

interface TranslationValue {
  name?: string;
  description?: string;
}

interface CategoryEditFormProps {
  category: {
    id: string;
    slug: string;
    sortOrder: number;
    status:
      | "draft"
      | "published"
      | "archived";

    translations: {
      en?: TranslationValue;
      zh?: TranslationValue;
      ru?: TranslationValue;
      ar?: TranslationValue;
      es?: TranslationValue;
      fr?: TranslationValue;
    };
  };
}

const initialState: CategoryActionState = {
  success: false,
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

export function CategoryEditForm({
  category,
}: CategoryEditFormProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    updateCategory,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      <input
        type="hidden"
        name="categoryId"
        value={category.id}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id="nameEn"
          label="英文名称 *"
          defaultValue={
            category.translations.en
              ?.name ?? ""
          }
          required
          disabled={isPending}
        />

        <TextField
          id="nameZh"
          label="中文名称 *"
          defaultValue={
            category.translations.zh
              ?.name ?? ""
          }
          required
          disabled={isPending}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextareaField
          id="descriptionEn"
          label="英文描述"
          defaultValue={
            category.translations.en
              ?.description ?? ""
          }
          disabled={isPending}
        />

        <TextareaField
          id="descriptionZh"
          label="中文描述"
          defaultValue={
            category.translations.zh
              ?.description ?? ""
          }
          disabled={isPending}
        />
      </div>

      <details className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
        <summary className="cursor-pointer font-bold text-gray-950">
          其他语言内容
        </summary>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          目前可优先维护中英文，其他语言后续由办公室逐步补充。
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <LanguageFields
            code="Ru"
            language="俄语"
            value={
              category.translations.ru
            }
            disabled={isPending}
          />

          <LanguageFields
            code="Ar"
            language="阿拉伯语"
            value={
              category.translations.ar
            }
            disabled={isPending}
            direction="rtl"
          />

          <LanguageFields
            code="Es"
            language="西班牙语"
            value={
              category.translations.es
            }
            disabled={isPending}
          />

          <LanguageFields
            code="Fr"
            language="法语"
            value={
              category.translations.fr
            }
            disabled={isPending}
          />
        </div>
      </details>

      <div className="grid gap-6 md:grid-cols-3">
        <TextField
          id="slug"
          label="Slug *"
          defaultValue={category.slug}
          required
          disabled={isPending}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          helpText="只能使用小写字母、数字和连字符。上线后尽量不要修改。"
        />

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
            defaultValue={
              category.sortOrder
            }
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
            defaultValue={
              category.status
            }
            disabled={isPending}
            className={inputClassName}
          >
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
          : "保存分类修改"}
      </button>
    </form>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  disabled: boolean;
  pattern?: string;
  helpText?: string;
}

function TextField({
  id,
  label,
  defaultValue,
  required = false,
  disabled,
  pattern,
  helpText,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type="text"
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        pattern={pattern}
        className={inputClassName}
      />

      {helpText && (
        <p className="text-xs leading-5 text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
}

interface TextareaFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  disabled: boolean;
  direction?: "ltr" | "rtl";
}

function TextareaField({
  id,
  label,
  defaultValue,
  disabled,
  direction = "ltr",
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700"
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        dir={direction}
        defaultValue={defaultValue}
        disabled={disabled}
        className={textareaClassName}
      />
    </div>
  );
}

interface LanguageFieldsProps {
  code: "Ru" | "Ar" | "Es" | "Fr";
  language: string;
  value?: TranslationValue;
  disabled: boolean;
  direction?: "ltr" | "rtl";
}

function LanguageFields({
  code,
  language,
  value,
  disabled,
  direction = "ltr",
}: LanguageFieldsProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="font-bold text-gray-950">
        {language}
      </h3>

      <div className="mt-5 space-y-5">
        <TextField
          id={`name${code}`}
          label="名称"
          defaultValue={
            value?.name ?? ""
          }
          disabled={disabled}
        />

        <TextareaField
          id={`description${code}`}
          label="描述"
          defaultValue={
            value?.description ?? ""
          }
          disabled={disabled}
          direction={direction}
        />
      </div>
    </div>
  );
}