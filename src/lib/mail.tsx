import { company } from "@/constants/company";
import { InquiryEmail } from "@/lib/email/InquiryEmail";
import { getResendClient } from "@/lib/resend";
import type { InquirySchema } from "@/lib/validation/inquiry";

function createInquirySubject(
  inquiry: InquirySchema
) {
  const companyName = inquiry.company?.trim();

  if (companyName) {
    return `New Inquiry: ${inquiry.product} — ${companyName}`;
  }

  return `New Inquiry: ${inquiry.product} — ${inquiry.name}`;
}

export async function sendInquiryEmail(
  inquiry: InquirySchema
) {
  const resend = getResendClient();

  const fromAddress =
    process.env.RESEND_FROM_EMAIL ??
    "SanHe Website <onboarding@resend.dev>";

  const recipientAddress =
    process.env.RESEND_TO_EMAIL ??
    company.email;

  const { data, error } =
    await resend.emails.send({
      from: fromAddress,
      to: recipientAddress,
      subject: createInquirySubject(inquiry),
      replyTo: inquiry.email,
      react: (
        <InquiryEmail inquiry={inquiry} />
      ),
    });

  if (error) {
    console.error(
      "Resend inquiry email error:",
      error
    );

    throw new Error(
      `Failed to send inquiry email: ${
        error.message ??
        "Unknown Resend error"
      }`
    );
  }

  if (!data?.id) {
    throw new Error(
      "Resend did not return an email ID."
    );
  }

  console.log(
    "Inquiry email sent successfully:",
    data.id
  );

  return {
    id: data.id,
  };
}