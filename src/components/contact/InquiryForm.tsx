"use client";

import { useActionState, useState } from "react";
import { submitInquiry } from "@/actions/inquiry";
import { Button } from "@/components/ui";
import {
  getProductsByCategory,
  productCategories,
} from "@/features/products/data";

const initialState = {
  success: false,
  message: "",
};

export function InquiryForm() {
  const [category, setCategory] = useState("");
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );

  const filteredProducts = category ? getProductsByCategory(category) : [];

  return (
    <form action={formAction} className="mt-8 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="Your Name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="name@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-semibold text-gray-700">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="Company Name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="destinationMarket"
            className="text-sm font-semibold text-gray-700"
          >
            Destination Country / Market *
          </label>
          <input
            id="destinationMarket"
            name="destinationMarket"
            type="text"
            required
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="Germany / UAE / Saudi Arabia"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-gray-700"
          >
            Product Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full rounded-2xl border px-5 py-4"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select Product Category</option>
            {productCategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product"
            className="text-sm font-semibold text-gray-700"
          >
            Product *
          </label>
          <select
            id="product"
            name="product"
            required
            className="w-full rounded-2xl border px-5 py-4"
            disabled={!category}
          >
            <option value="">
              {category ? "Select Product" : "Select category first"}
            </option>
            {filteredProducts.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="text-sm font-semibold text-gray-700"
          >
            Estimated Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="1 x 40HQ / Long-term cooperation"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="packaging"
            className="text-sm font-semibold text-gray-700"
          >
            Packaging Preference
          </label>
          <input
            id="packaging"
            name="packaging"
            type="text"
            className="w-full rounded-2xl border px-5 py-4"
            placeholder="10kg Carton / Mesh Bag / Private Label"
          />
        </div>
      </div>

      <fieldset className="rounded-2xl border p-6">
        <legend className="px-1 text-lg font-semibold text-gray-900">
          Additional Services
        </legend>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            "OEM Production",
            "Private Label",
            "Customized Packaging",
            "Mixed Container",
          ].map((service) => (
            <label key={service} className="flex items-center gap-3">
              <input type="checkbox" name="services" value={service} />
              {service}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-gray-700"
        >
          Detailed Requirements *
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="min-h-40 w-full rounded-2xl border px-5 py-4"
          placeholder="Tell us your product, quantity, packaging and delivery requirements."
        />
      </div>

      {state.message && (
        <div
          className={`whitespace-pre-line rounded-2xl px-5 py-4 text-sm font-semibold ${
            state.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}