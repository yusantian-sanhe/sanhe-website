import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((value) => value || undefined);

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(120, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  company: optionalText,

  category: z
    .string()
    .trim()
    .min(1, "Product category is required.")
    .max(120),

  product: z
    .string()
    .trim()
    .min(1, "Product is required.")
    .max(200),

  destinationMarket: z
    .string()
    .trim()
    .min(1, "Destination market is required.")
    .max(200),

  quantity: optionalText,

  packaging: optionalText,

  services: z
    .array(z.string().trim().min(1).max(100))
    .max(10)
    .default([]),

  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(5000, "Message is too long."),
});

export type InquirySchema = z.infer<
  typeof inquirySchema
>;