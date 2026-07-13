"use client";

import { useActionState } from "react";
import {
  updateProduct,
  type ProductActionState,
} from "@/app/admin/products/actions";

type ProductStatus =
  | "draft"
  | "published"
  | "archived";

interface LocalizedContent {
  en?: string;
  zh?: string;
  ru?: string;
  ar?: string;
  es?: string;
  fr?: string;
}

interface ProductTranslations {
  en?: TranslationValue;
  zh?: TranslationValue;
  ru?: TranslationValue;
  ar?: TranslationValue;
  es?: TranslationValue;
  fr?: TranslationValue;
}

interface TranslationValue {
  name?: string;
  description?: string;
  details?: string;
}

interface ProductEditFormProps {
  product: {
    id: string;
    categoryId: string;
    slug: string;
    status: ProductStatus;
    sortOrder: number;
    featured: boolean;
    translations: ProductTranslations;
    specifications: {
      en?: string[];
      zh?: string[];
      ru?: string[];
      ar?: string[];
      es?: string[];
      fr?: string[];
    };
    packaging: LocalizedContent;
    moq: LocalizedContent;
    supplyAbility: LocalizedContent;
    loadingCapacity: LocalizedContent;
  };

  categories: {
    id: string;
    englishName: string;
    chineseName: string;
    status: ProductStatus;
  }[];
}

const initialState: ProductActionState = {
  success: false,
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

const textareaClassName =
  "min-h-32 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

function joinLines(
  values?: string[]
) {
  return (values ?? []).join("\n");
}

export function ProductEditForm({
  product,
  categories,
}: ProductEditFormProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    updateProduct,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      <input
        type="hidden"
        name="productId"
        value={product.id}
      />

      <FormSection
        eyebrow="Basic Information"
        title="基本资料"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="block text-sm font-bold text-gray-700"
            >
              产品分类 *
            </label>

            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={
                product.categoryId
              }
              disabled={isPending}
              className={inputClassName}
            >
              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.englishName}
                    {" / "}
                    {category.chineseName}
                    {category.status !==
                    "published"
                      ? "（非发布状态）"
                      : ""}
                  </option>
                )
              )}
            </select>
          </div>

          <TextField
            id="slug"
            label="产品 Slug *"
            defaultValue={product.slug}
            required
            disabled={isPending}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          />

          <TextField
            id="nameEn"
            label="英文名称 *"
            defaultValue={
              product.translations.en
                ?.name ?? ""
            }
            required
            disabled={isPending}
          />

          <TextField
            id="nameZh"
            label="中文名称 *"
            defaultValue={
              product.translations.zh
                ?.name ?? ""
            }
            required
            disabled={isPending}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
                product.status
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
                product.sortOrder
              }
              disabled={isPending}
              className={inputClassName}
            />
          </div>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={
                  product.featured
                }
                disabled={isPending}
                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
              />

              <span className="font-bold text-gray-950">
                首页推荐
              </span>
            </label>
          </div>
        </div>
      </FormSection>

      <LanguageSection
        title="英文内容"
        code="En"
        value={
          product.translations.en
        }
        specifications={joinLines(
          product.specifications.en
        )}
        trade={{
          packaging:
            product.packaging.en,
          moq: product.moq.en,
          supplyAbility:
            product.supplyAbility.en,
          loadingCapacity:
            product.loadingCapacity.en,
        }}
        disabled={isPending}
      />

      <LanguageSection
        title="中文内容"
        code="Zh"
        value={
          product.translations.zh
        }
        specifications={joinLines(
          product.specifications.zh
        )}
        trade={{
          packaging:
            product.packaging.zh,
          moq: product.moq.zh,
          supplyAbility:
            product.supplyAbility.zh,
          loadingCapacity:
            product.loadingCapacity.zh,
        }}
        disabled={isPending}
      />

      <details className="rounded-[28px] border border-gray-200 bg-gray-50 p-6">
        <summary className="cursor-pointer text-xl font-bold text-gray-950">
          其他四种语言
        </summary>

        <div className="mt-8 space-y-8">
          <LanguageSection
            title="俄语"
            code="Ru"
            value={
              product.translations.ru
            }
            specifications={joinLines(
              product.specifications.ru
            )}
            trade={{
              packaging:
                product.packaging.ru,
              moq: product.moq.ru,
              supplyAbility:
                product.supplyAbility.ru,
              loadingCapacity:
                product.loadingCapacity.ru,
            }}
            disabled={isPending}
          />

          <LanguageSection
            title="阿拉伯语"
            code="Ar"
            value={
              product.translations.ar
            }
            specifications={joinLines(
              product.specifications.ar
            )}
            trade={{
              packaging:
                product.packaging.ar,
              moq: product.moq.ar,
              supplyAbility:
                product.supplyAbility.ar,
              loadingCapacity:
                product.loadingCapacity.ar,
            }}
            direction="rtl"
            disabled={isPending}
          />

          <LanguageSection
            title="西班牙语"
            code="Es"
            value={
              product.translations.es
            }
            specifications={joinLines(
              product.specifications.es
            )}
            trade={{
              packaging:
                product.packaging.es,
              moq: product.moq.es,
              supplyAbility:
                product.supplyAbility.es,
              loadingCapacity:
                product.loadingCapacity.es,
            }}
            disabled={isPending}
          />

          <LanguageSection
            title="法语"
            code="Fr"
            value={
              product.translations.fr
            }
            specifications={joinLines(
              product.specifications.fr
            )}
            trade={{
              packaging:
                product.packaging.fr,
              moq: product.moq.fr,
              supplyAbility:
                product.supplyAbility.fr,
              loadingCapacity:
                product.loadingCapacity.fr,
            }}
            disabled={isPending}
          />
        </div>
      </details>

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
        className="rounded-2xl bg-green-800 px-7 py-4 font-bold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "正在保存..."
          : "保存产品修改"}
      </button>
    </form>
  );
}

interface FormSectionProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function FormSection({
  eyebrow,
  title,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-bold text-gray-950">
        {title}
      </h2>

      <div className="mt-7 space-y-6">
        {children}
      </div>
    </section>
  );
}

interface LanguageSectionProps {
  title: string;
  code:
    | "En"
    | "Zh"
    | "Ru"
    | "Ar"
    | "Es"
    | "Fr";
  value?: TranslationValue;
  specifications: string;
  trade: {
    packaging?: string;
    moq?: string;
    supplyAbility?: string;
    loadingCapacity?: string;
  };
  disabled: boolean;
  direction?: "ltr" | "rtl";
}

function LanguageSection({
  title,
  code,
  value,
  specifications,
  trade,
  disabled,
  direction = "ltr",
}: LanguageSectionProps) {
  return (
    <FormSection
      eyebrow={title}
      title={title}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id={`name${code}`}
          label="名称"
          defaultValue={
            value?.name ?? ""
          }
          disabled={disabled}
          direction={direction}
        />

        <TextareaField
          id={`description${code}`}
          label="简短描述"
          defaultValue={
            value?.description ?? ""
          }
          disabled={disabled}
          direction={direction}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextareaField
          id={`details${code}`}
          label="详细介绍"
          defaultValue={
            value?.details ?? ""
          }
          disabled={disabled}
          direction={direction}
        />

        <TextareaField
          id={`specifications${code}`}
          label="产品规格（每行一项）"
          defaultValue={
            specifications
          }
          disabled={disabled}
          direction={direction}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id={`packaging${code}`}
          label="包装"
          defaultValue={
            trade.packaging ?? ""
          }
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`moq${code}`}
          label="起订量"
          defaultValue={
            trade.moq ?? ""
          }
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`supplyAbility${code}`}
          label="供应能力"
          defaultValue={
            trade.supplyAbility ?? ""
          }
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`loadingCapacity${code}`}
          label="装载量"
          defaultValue={
            trade.loadingCapacity ?? ""
          }
          disabled={disabled}
          direction={direction}
        />
      </div>
    </FormSection>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  disabled: boolean;
  required?: boolean;
  pattern?: string;
  direction?: "ltr" | "rtl";
}

function TextField({
  id,
  label,
  defaultValue,
  disabled,
  required = false,
  pattern,
  direction = "ltr",
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
        dir={direction}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        pattern={pattern}
        className={inputClassName}
      />
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