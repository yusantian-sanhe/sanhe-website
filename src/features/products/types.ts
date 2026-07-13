export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
}

export interface ProductAdvantage {
  title: string;
  description: string;
}

export interface ProductAdditionalDetails {
  /**
   * Product origin.
   *
   * Example:
   * China / Shandong, China
   */
  origin?: string;

  /**
   * Available varieties or product types.
   */
  varieties?: string[];

  /**
   * Main supply or harvest season.
   */
  season?: string;

  /**
   * HS customs code.
   */
  hsCode?: string;

  /**
   * Recommended storage conditions.
   */
  storage?: string;

  /**
   * Expected shelf life.
   */
  shelfLife?: string;

  /**
   * Available sizes or grades.
   */
  sizes?: string[];

  /**
   * Processing methods.
   */
  processingOptions?: string[];

  /**
   * Supported certification standards.
   */
  certifications?: string[];
}

export interface ProductSeo {
  /**
   * Optional SEO title override.
   */
  title?: string;

  /**
   * Optional SEO description override.
   */
  description?: string;

  /**
   * Optional Open Graph image.
   */
  image?: string;
}

export interface Product {
  /**
   * Basic identity
   */
  slug: string;
  categorySlug: string;

  /**
   * Temporary fallback content.
   *
   * The translated website content continues to come
   * from messages/<locale>/products.json.
   */
  category: string;
  name: string;
  description: string;
  details: string;

  /**
   * Product media
   */
  image: string;
  images: string[];

  /**
   * Main product specifications
   */
  specifications: string[];

  /**
   * Packaging information
   */
  packaging: string;
  packagingOptions?: string[];

  /**
   * Trade information
   */
  moq: string;
  supplyAbility: string;
  loadingCapacity: string;

  /**
   * Product advantages
   */
  advantages?: ProductAdvantage[];

  /**
   * Supply capability
   */
  supplyCapabilities?: string[];

  /**
   * Buyer applications
   */
  applications?: string[];

  /**
   * Optional extended product information.
   *
   * Existing products do not need to add these fields yet.
   */
  additionalDetails?: ProductAdditionalDetails;

  /**
   * Optional per-product SEO override.
   */
  seo?: ProductSeo;

  /**
   * Controls whether a product can be displayed publicly.
   *
   * Existing products remain visible when omitted.
   */
  status?: "active" | "draft";
}