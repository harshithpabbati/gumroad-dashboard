export interface OneTimeSale {
  id: string;
  email: string;
  seller_id: string;
  timestamp: string;
  daystamp: string;
  created_at: Date;
  product_name: string;
  product_has_variants: boolean;
  price: number;
  gumroad_fee: number;
  is_bundle_purchase: boolean;
  is_bundle_product_purchase: boolean;
  formatted_display_price: string;
  formatted_total_price: string;
  currency_symbol: string;
  amount_refundable_in_currency: string;
  product_id: string;
  product_permalink: string;
  partially_refunded: boolean;
  chargedback: boolean;
  purchase_email: string;
  state: string;
  zip_code: string;
  country: string;
  country_iso2: string;
  paid: boolean;
  has_variants: boolean;
  variants_and_quantity: string;
  has_custom_fields: boolean;
  custom_fields: any;
  order_id: number;
  is_product_physical: boolean;
  is_recurring_billing: boolean;
  can_contact: boolean;
  is_following: boolean;
  disputed: boolean;
  dispute_won: boolean;
  is_additional_contribution: boolean;
  discover_fee_charged: boolean;
  is_upgrade_purchase: boolean;
  is_more_like_this_recommended: boolean;
  is_gift_sender_purchase: boolean;
  is_gift_receiver_purchase: boolean;
  referrer: string;
  paypal_refund_expired: boolean;
  card: {
    visual: any;
    type: any;
    bin: any;
    expiry_month: any;
    expiry_year: any;
  };
  product_rating: any;
  reviews_count: number;
  average_rating: number;
  quantity: number;
  affiliate?: {
    email: string;
    amount: number;
  } | null;
}

export interface SubscriptionSale extends OneTimeSale {
  subscription_duration: string;
  cancelled: boolean;
  dead: boolean;
  ended: boolean;
  free_trial_ended: any;
  free_trial_ends_on: any;
  recurring_charge: boolean;
  variants: {
    Tier: string;
  };
  subscription_id: string;
}

export type Sale = OneTimeSale | SubscriptionSale;

export type TimePeriod = 'week' | 'month' | 'quarter' | 'half-year' | 'year';
