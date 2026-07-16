"use server";

import { redirect } from "next/navigation";
import { sendInquiryEmail } from "@/lib/mail";
import { inquirySchema } from "@/lib/validation/inquiry";
import {
  defaultLocale,
  isLocale,
} from "@/i18n/locales";

export type InquiryFieldName =
  | "name"
  | "email"
  | "category"
  | "product"
  | "destinationMarket"
  | "message";

export interface InquiryActionState {
  success: boolean;
  message: string;
  field: InquiryFieldName | null;
}

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const requestedLocale = formData.get("locale");

  const locale =
    typeof requestedLocale === "string" &&
    isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  const result = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),

    category: formData.get("category"),
    product: formData.get("product"),
    destinationMarket: formData.get(
      "destinationMarket"
    ),

    quantity: formData.get("quantity"),
    packaging: formData.get("packaging"),

    services: formData.getAll("services"),

    message: formData.get("message"),
  });

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const fieldName = firstIssue?.path[0];

    const supportedFields: InquiryFieldName[] = [
      "name",
      "email",
      "category",
      "product",
      "destinationMarket",
      "message",
    ];

    const field =
      typeof fieldName === "string" &&
      supportedFields.includes(
        fieldName as InquiryFieldName
      )
        ? (fieldName as InquiryFieldName)
        : null;

    console.error(
      "Inquiry validation failed:",
      result.error.flatten()
    );

    return {
      success: false,
      message: "validationError",
      field,
    };
  }

  try {
    const data = result.data;

    console.log("New inquiry received:", data);

    await sendInquiryEmail(data);
  } catch (error) {
    console.error("Failed to send inquiry:", error);

    return {
      success: false,
      message: "sendError",
      field: null,
    };
  }

  redirect(`/${locale}/contact/success`);
}