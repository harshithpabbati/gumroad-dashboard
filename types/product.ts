export interface Recurrence {}

export interface Variant {
  title: string;
  options: {
    name: string;
    price_difference: number;
    is_pay_what_you_want: boolean;
    recurrence_prices: any;
    url: string | null;
  }[];
}

export interface Product {
  name: string;
  preview_url: string | null;
  description: string;
  customizable_price: boolean;
  require_shipping: boolean;
  custom_receipt: string;
  custom_permalink: string;
  subscription_duration: string;
  id: string;
  url: string | null;
  price: number;
  currency: string;
  short_url: string;
  thumbnail_url: string | null;
  tags: string[];
  formatted_price: string;
  published: boolean;
  file_info: any;
  max_purchase_count: any;
  deleted: boolean;
  custom_fields: any[];
  custom_summary: string;
  is_tiered_membership: boolean;
  recurrences: Recurrence[];
  variants: Variant[];
  custom_delivery_url: any;
  sales_count: number;
  sales_usd_cents: number;
}
