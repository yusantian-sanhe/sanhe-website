"use server";
import { sendInquiryEmail } from "@/lib/mail";
import { redirect } from "next/navigation";
import { inquirySchema } from "@/lib/validation/inquiry";

export interface InquiryActionState {
  success: boolean;
  message: string;
}

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
) {
  const result = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),

    product: formData.get("product"),
    destinationMarket: formData.get("destinationMarket"),

    quantity: formData.get("quantity"),
    packaging: formData.get("packaging"),

    services: formData.getAll("services"),

    message: formData.get("message"),
  });

 if (!result.success) {
  const message = result.error.issues
    .map((issue) => `• ${issue.message}`)
    .join("\n");

  return {
    success: false,
    message,
  };
}
  const data = result.data;

console.log("New inquiry received:", data);

await sendInquiryEmail(data);

redirect("/en/contact/success");
}