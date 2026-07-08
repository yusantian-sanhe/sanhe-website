import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required."),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  company: z.string().optional(),

  product: z.string().min(1, "Product is required."),

  destinationMarket: z.string().min(1, "Destination market is required."),

  quantity: z.string().optional(),

  packaging: z.string().optional(),

  services: z.array(z.string()).default([]),

  message: z.string().min(1, "Message is required."),
});

export type InquirySchema = z.infer<typeof inquirySchema>;