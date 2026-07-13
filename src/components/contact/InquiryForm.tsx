"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { submitInquiry } from "@/actions/inquiry";
import { Button } from "@/components/ui";
import {
  getProductsByCategory,
  productCategories,
  products,
} from "@/features/products/data";

interface InquiryFormProps {
  locale: string;
  initialProductName?: string;
}

type InquiryStatusKey =
  | "validationError"
  | "sendError";

const initialState = {
  success: false,
  message: "",
};

const services = [
  {
    key: "oem",
    value: "OEM Production",
  },
  {
    key: "privateLabel",
    value: "Private Label",
  },
  {
    key: "customizedPackaging",
    value: "Customized Packaging",
  },
  {
    key: "mixedContainer",
    value: "Mixed Container",
  },
] as const;

function isInquiryStatusKey(
  value: string
): value is InquiryStatusKey {
  return (
    value === "validationError" ||
    value === "sendError"
  );
}

export function InquiryForm({
  locale,
  initialProductName = "",
}: InquiryFormProps) {
  const t = useTranslations("contact.form");
  const productsT = useTranslations("products");

  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [matchedProductName, setMatchedProductName] =
    useState("");

  const [state, formAction, isPending] =
    useActionState(
      submitInquiry,
      initialState
    );

  const filteredProducts = useMemo(
    () =>
      category
        ? getProductsByCategory(category)
        : [],
    [category]
  );

  useEffect(() => {
    if (!initialProductName) {
      setMatchedProductName("");
      return;
    }

    const normalizedInitialName =
      initialProductName.trim().toLowerCase();

    const matchedProduct = products.find(
      (product) => {
        const translatedName = productsT(
          `items.${product.slug}.name`
        );

        return (
          translatedName
            .trim()
            .toLowerCase() ===
            normalizedInitialName ||
          product.name
            .trim()
            .toLowerCase() ===
            normalizedInitialName ||
          product.slug
            .trim()
            .toLowerCase() ===
            normalizedInitialName
        );
      }
    );

    if (!matchedProduct) {
      setMatchedProductName("");
      return;
    }

    const translatedProductName =
      productsT(
        `items.${matchedProduct.slug}.name`
      );

    setCategory(
      matchedProduct.categorySlug
    );

    setSelectedProduct(
      translatedProductName
    );

    setMatchedProductName(
      translatedProductName
    );
  }, [initialProductName, productsT]);

  function handleCategoryChange(
    value: string
  ) {
    setCategory(value);
    setSelectedProduct("");
    setMatchedProductName("");
  }

  const statusMessage =
    state.message &&
    isInquiryStatusKey(state.message)
      ? t(`status.${state.message}`)
      : state.message;

  return (
    <form
      action={formAction}
      className="mt-8 space-y-8"
    >
      <input
        type="hidden"
        name="locale"
        value={locale}
      />

      {matchedProductName && (
        <div className="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
            {t("selectedProduct")}
          </p>

          <p className="mt-2 font-semibold text-green-950">
            {matchedProductName}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.name.label")} *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.name.placeholder"
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.email.label")} *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.email.placeholder"
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="company"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.company.label")}
          </label>

          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.company.placeholder"
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="destinationMarket"
            className="text-sm font-semibold text-gray-700"
          >
            {t(
              "fields.destinationMarket.label"
            )}{" "}
            *
          </label>

          <input
            id="destinationMarket"
            name="destinationMarket"
            type="text"
            required
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.destinationMarket.placeholder"
            )}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.category.label")} *
          </label>

          <select
            id="category"
            name="category"
            required
            disabled={isPending}
            value={category}
            onChange={(event) =>
              handleCategoryChange(
                event.target.value
              )
            }
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="">
              {t(
                "fields.category.placeholder"
              )}
            </option>

            {productCategories.map(
              (item) => (
                <option
                  key={item.slug}
                  value={item.slug}
                >
                  {productsT(
                    `categories.${item.slug}.name`
                  )}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.product.label")} *
          </label>

          <select
            id="product"
            name="product"
            required
            disabled={
              !category || isPending
            }
            value={selectedProduct}
            onChange={(event) => {
              setSelectedProduct(
                event.target.value
              );

              setMatchedProductName(
                event.target.value
              );
            }}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="">
              {category
                ? t(
                    "fields.product.placeholder"
                  )
                : t(
                    "fields.product.selectCategoryFirst"
                  )}
            </option>

            {filteredProducts.map(
              (product) => {
                const productName =
                  productsT(
                    `items.${product.slug}.name`
                  );

                return (
                  <option
                    key={product.slug}
                    value={productName}
                  >
                    {productName}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.quantity.label")}
          </label>

          <input
            id="quantity"
            name="quantity"
            type="text"
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.quantity.placeholder"
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="packaging"
            className="text-sm font-semibold text-gray-700"
          >
            {t("fields.packaging.label")}
          </label>

          <input
            id="packaging"
            name="packaging"
            type="text"
            disabled={isPending}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder={t(
              "fields.packaging.placeholder"
            )}
          />
        </div>
      </div>

      <fieldset
        disabled={isPending}
        className="rounded-2xl border border-gray-200 p-6 disabled:opacity-70"
      >
        <legend className="px-2 text-lg font-semibold text-gray-900">
          {t("services.title")}
        </legend>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <label
              key={service.key}
              className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 transition hover:bg-green-50"
            >
              <input
                type="checkbox"
                name="services"
                value={service.value}
                className="h-4 w-4 accent-green-700"
              />

              <span className="text-gray-700">
                {t(
                  `services.items.${service.key}`
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-gray-700"
        >
          {t("fields.message.label")} *
        </label>

        <textarea
          id="message"
          name="message"
          required
          disabled={isPending}
          defaultValue={
            matchedProductName
              ? t(
                  "fields.message.productTemplate",
                  {
                    product:
                      matchedProductName,
                  }
                )
              : ""
          }
          className="min-h-40 w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-100"
          placeholder={t(
            "fields.message.placeholder"
          )}
        />
      </div>

      {statusMessage && (
        <div
          role="alert"
          aria-live="polite"
          className={`whitespace-pre-line rounded-2xl px-5 py-4 text-sm font-semibold ${
            state.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending
          ? t("submitting")
          : t("submit")}
      </Button>
    </form>
  );
}