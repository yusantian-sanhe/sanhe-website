export interface InquiryData {
  name: string;
  email: string;
  company?: string;

  product: string;
  destinationMarket: string;

  quantity?: string;
  packaging?: string;

  services: string[];

  message: string;
}