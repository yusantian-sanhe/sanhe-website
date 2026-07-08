import { InquirySchema } from "@/lib/validation/inquiry";
import { InquiryEmail } from "@/lib/email/InquiryEmail";
import { resend } from "@/lib/resend";
import { company } from "@/constants/company";

export async function sendInquiryEmail(inquiry: InquirySchema) {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not configured. Inquiry email skipped.");
    return;
  }

  await resend.emails.send({
    from: "SanHe Website <onboarding@resend.dev>",
    to: company.email,
    subject: `New Inquiry: ${inquiry.product}`,
    replyTo: inquiry.email,
    react: <InquiryEmail inquiry={inquiry} />,
  });
}