import type { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    id: "/en",

    name:
      "SanHe Agricultural Food Supplier",

    short_name: "SanHe",

    description:
      SEO.defaultDescription,

    start_url: "/en",

    scope: "/",

    display: "standalone",

    background_color: "#ffffff",

    theme_color: "#0f6b3f",

    categories: [
      "business",
      "food",
      "shopping",
    ],

    icons: [
      {
        src: "/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}