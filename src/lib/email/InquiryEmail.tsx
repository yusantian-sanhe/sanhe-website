import { InquirySchema } from "@/lib/validation/inquiry";

interface InquiryEmailProps {
  inquiry: InquirySchema;
}

export function InquiryEmail({ inquiry }: InquiryEmailProps) {
  return (
    <div>
      <h1>New Inquiry Received</h1>

      <p><strong>Name:</strong> {inquiry.name}</p>
      <p><strong>Email:</strong> {inquiry.email}</p>
      <p><strong>Company:</strong> {inquiry.company || "-"}</p>
      <p><strong>Product:</strong> {inquiry.product}</p>
      <p><strong>Destination Market:</strong> {inquiry.destinationMarket}</p>
      <p><strong>Quantity:</strong> {inquiry.quantity || "-"}</p>
      <p><strong>Packaging:</strong> {inquiry.packaging || "-"}</p>
      <p><strong>Services:</strong> {inquiry.services.join(", ") || "-"}</p>
      <p><strong>Message:</strong></p>
      <p>{inquiry.message}</p>
    </div>
  );
}