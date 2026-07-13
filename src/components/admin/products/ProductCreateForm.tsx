"use client";

import {
  useActionState,
} from "react";
import {
  createProduct,
  type ProductActionState,
} from "@/app/admin/products/actions";

interface CategoryOption {
  id: string;
  slug: string;
  englishName: string;
  chineseName: string;
  status:
    | "draft"
    | "published"
    | "archived";
}

interface ProductCreateFormProps {
  categories: CategoryOption[];
}

const initialState: ProductActionState = {
  success: false,
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

const textareaClassName =
  "min-h-32 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100";

export function ProductCreateForm({
  categories,
}: ProductCreateFormProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createProduct,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-10"
    >
      <FormSection
        eyebrow="Basic Information"
        title="基本资料"
        description="先完成分类、产品名称、Slug 和发布设置。"
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
              defaultValue=""
              disabled={isPending}
              className={inputClassName}
            >
              <option
                value=""
                disabled
              >
                请选择产品分类
              </option>

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
            placeholder="fresh-ginger"
            required
            disabled={isPending}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            helpText="用于产品网址，只能使用小写字母、数字和连字符。"
          />

          <TextField
            id="nameEn"
            label="英文名称 *"
            placeholder="Fresh Ginger"
            required
            disabled={isPending}
          />

          <TextField
            id="nameZh"
            label="中文名称 *"
            placeholder="新鲜生姜"
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
              产品状态
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
              defaultValue="0"
              disabled={isPending}
              className={inputClassName}
            />
          </div>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
              <input
                name="featured"
                type="checkbox"
                disabled={isPending}
                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
              />

              <span>
                <span className="block font-bold text-gray-950">
                  首页推荐
                </span>

                <span className="mt-1 block text-xs text-gray-500">
                  后续可用于首页推荐产品。
                </span>
              </span>
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection
        eyebrow="English Content"
        title="英文内容"
        description="英文与中文是当前优先维护的前端语言。"
      >
        <TextareaField
          id="descriptionEn"
          label="英文简短描述"
          placeholder="Export-grade fresh ginger supplied for global importers and wholesalers."
          disabled={isPending}
        />

        <TextareaField
          id="detailsEn"
          label="英文详细介绍"
          placeholder="Describe product quality, sourcing, processing, export experience and buyer value."
          disabled={isPending}
        />

        <TextareaField
          id="specificationsEn"
          label="英文规格"
          placeholder={`Fresh and firm roots
Clean appearance
Multiple sizes available
Export-ready packing`}
          disabled={isPending}
          helpText="每行填写一项规格。"
        />
      </FormSection>

      <FormSection
        eyebrow="Chinese Content"
        title="中文内容"
        description="用于中文产品页面和办公室内部校对。"
      >
        <TextareaField
          id="descriptionZh"
          label="中文简短描述"
          placeholder="面向全球进口商和批发商供应的出口级新鲜生姜。"
          disabled={isPending}
        />

        <TextareaField
          id="detailsZh"
          label="中文详细介绍"
          placeholder="填写产品品质、产地、加工、出口经验和采购优势。"
          disabled={isPending}
        />

        <TextareaField
          id="specificationsZh"
          label="中文规格"
          placeholder={`新鲜、坚实
外观洁净
多种规格可选
支持出口包装`}
          disabled={isPending}
          helpText="每行填写一项规格。"
        />
      </FormSection>

      <FormSection
        eyebrow="Trade Information"
        title="贸易与供应信息"
        description="中英文分别填写，其他语言可在产品编辑页面中后续补充。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <LocalizedTextPair
            englishId="packagingEn"
            chineseId="packagingZh"
            label="包装方式"
            englishPlaceholder="10kg carton or customized packaging"
            chinesePlaceholder="10公斤纸箱或定制包装"
            disabled={isPending}
          />

          <LocalizedTextPair
            englishId="moqEn"
            chineseId="moqZh"
            label="起订量"
            englishPlaceholder="One container"
            chinesePlaceholder="一个集装箱"
            disabled={isPending}
          />

          <LocalizedTextPair
            englishId="supplyAbilityEn"
            chineseId="supplyAbilityZh"
            label="供应能力"
            englishPlaceholder="Stable seasonal supply"
            chinesePlaceholder="稳定季节性供应"
            disabled={isPending}
          />

          <LocalizedTextPair
            englishId="loadingCapacityEn"
            chineseId="loadingCapacityZh"
            label="装载量"
            englishPlaceholder="Based on packing and container type"
            chinesePlaceholder="根据包装和集装箱类型确定"
            disabled={isPending}
          />
        </div>
      </FormSection>

      <details className="rounded-[28px] border border-gray-200 bg-gray-50 p-6">
        <summary className="cursor-pointer text-xl font-bold text-gray-950">
          其他四种语言（可暂时留空）
        </summary>

        <p className="mt-3 leading-7 text-gray-600">
          当前俄语、阿拉伯语、西班牙语和法语前端尚未完成。
          数据库已经预留字段，办公室后期可逐步补充。
        </p>

        <div className="mt-8 space-y-8">
          <OptionalLanguageSection
            code="Ru"
            title="俄语"
            disabled={isPending}
          />

          <OptionalLanguageSection
            code="Ar"
            title="阿拉伯语"
            direction="rtl"
            disabled={isPending}
          />

          <OptionalLanguageSection
            code="Es"
            title="西班牙语"
            disabled={isPending}
          />

          <OptionalLanguageSection
            code="Fr"
            title="法语"
            disabled={isPending}
          />
        </div>
      </details>

      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700"
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-gray-500">
          产品图片、图库、SEO 和扩展资料将在保存产品后继续添加。
        </p>

        <button
          type="submit"
          disabled={
            isPending ||
            categories.length === 0
          }
          className="inline-flex items-center justify-center rounded-2xl bg-green-800 px-7 py-4 font-bold text-white transition hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "正在创建产品..."
            : "创建产品"}
        </button>
      </div>
    </form>
  );
}

interface FormSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function FormSection({
  eyebrow,
  title,
  description,
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

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>

      <div className="mt-7 space-y-6">
        {children}
      </div>
    </section>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled: boolean;
  pattern?: string;
  helpText?: string;
  direction?: "ltr" | "rtl";
}

function TextField({
  id,
  label,
  placeholder,
  required = false,
  disabled,
  pattern,
  helpText,
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
        required={required}
        disabled={disabled}
        pattern={pattern}
        placeholder={placeholder}
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
  placeholder?: string;
  disabled: boolean;
  helpText?: string;
  direction?: "ltr" | "rtl";
}

function TextareaField({
  id,
  label,
  placeholder,
  disabled,
  helpText,
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
        disabled={disabled}
        placeholder={placeholder}
        className={textareaClassName}
      />

      {helpText && (
        <p className="text-xs leading-5 text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
}

interface LocalizedTextPairProps {
  englishId: string;
  chineseId: string;
  label: string;
  englishPlaceholder: string;
  chinesePlaceholder: string;
  disabled: boolean;
}

function LocalizedTextPair({
  englishId,
  chineseId,
  label,
  englishPlaceholder,
  chinesePlaceholder,
  disabled,
}: LocalizedTextPairProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-bold text-gray-950">
        {label}
      </h3>

      <div className="mt-5 space-y-5">
        <TextField
          id={englishId}
          label="English"
          placeholder={englishPlaceholder}
          disabled={disabled}
        />

        <TextField
          id={chineseId}
          label="中文"
          placeholder={chinesePlaceholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

interface OptionalLanguageSectionProps {
  code: "Ru" | "Ar" | "Es" | "Fr";
  title: string;
  disabled: boolean;
  direction?: "ltr" | "rtl";
}

function OptionalLanguageSection({
  code,
  title,
  disabled,
  direction = "ltr",
}: OptionalLanguageSectionProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5">
      <h3 className="text-xl font-bold text-gray-950">
        {title}
      </h3>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextField
          id={`name${code}`}
          label="名称"
          disabled={disabled}
          direction={direction}
        />

        <TextareaField
          id={`description${code}`}
          label="简短描述"
          disabled={disabled}
          direction={direction}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextareaField
          id={`details${code}`}
          label="详细介绍"
          disabled={disabled}
          direction={direction}
        />

        <TextareaField
          id={`specifications${code}`}
          label="产品规格（每行一项）"
          disabled={disabled}
          direction={direction}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextField
          id={`packaging${code}`}
          label="包装"
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`moq${code}`}
          label="起订量"
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`supplyAbility${code}`}
          label="供应能力"
          disabled={disabled}
          direction={direction}
        />

        <TextField
          id={`loadingCapacity${code}`}
          label="装载量"
          disabled={disabled}
          direction={direction}
        />
      </div>
    </section>
  );
}