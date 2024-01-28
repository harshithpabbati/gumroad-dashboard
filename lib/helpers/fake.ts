import { Product, Variant } from '@/types/product';
import { Sale, SubscriptionSale } from '@/types/sale';

export function getFakeProduct(isSubscription: boolean = true): Product {
  const product: Product = {
    name: `Fake ${isSubscription ? 'Subscription' : 'Product'}`,
    preview_url: null,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    customizable_price: Math.random() > 0.5,
    require_shipping: Math.random() > 0.5,
    custom_receipt: 'Fake custom receipt',
    custom_permalink: 'fake_product',
    subscription_duration: null,
    id: Math.random().toString(36).substr(2, 10),
    url: null,
    price: Math.floor(Math.random() * 100), // Random price between 0 and 99
    currency: 'USD',
    short_url: 'https://harshith.gumroad.com/i/nextify',
    thumbnail_url: null,
    tags: ['fake', 'product'],
    formatted_price: `$${Math.floor(Math.random() * 100)}`, // Random formatted price
    published: Math.random() > 0.5,
    file_info: {},
    max_purchase_count: {},
    deleted: false,
    custom_fields: [],
    custom_summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    is_tiered_membership: isSubscription,
    recurrences: [],
    variants: [],
    custom_delivery_url: {},
    sales_count: Math.floor(Math.random() * 1000), // Random sales count
    sales_usd_cents: Math.floor(Math.random() * 10000), // Random sales in USD cents
  };

  // Generate random number of variants
  const variantCount = Math.floor(Math.random() * 5);
  for (let j = 0; j < variantCount; j++) {
    const variant: Variant = {
      title: `Variant ${j + 1}`,
      options: [
        {
          name: `Option ${j + 1}`,
          price_difference: Math.floor(Math.random() * 50), // Random price difference up to 49
          is_pay_what_you_want: Math.random() > 0.5,
          recurrence_prices: {},
          url: null,
        },
      ],
    };
    product.variants.push(variant);
  }

  return product;
}

const TIERS = ['Free', 'Pro', 'Extra Pro'];
const COUNTRIES = ['India', 'US', 'UK', 'Russia', 'Germany'];
const MEMBERSHIPS = ['monthly', 'quarterly', 'half-yearly', 'annual'];

export function getFakeSales(): Sale[] {
  const sales: Sale[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);

  for (let i = 0; i < 1000; i++) {
    const randomDate = new Date(startDate);
    randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 365)); // Random date within the last year
    const price = Math.floor(Math.random() * 100); // Random price between 0 and 99
    const gumroadFee = 0.1 * price; // Gumroad fee is 10% of the price

    sales.push({
      id: Math.random().toString(36).substr(2, 10), // Random ID
      email: 'fake@example.com', // Fake email
      seller_id: 'fake_seller_id', // Fake seller ID
      timestamp: 'about 16 hours ago', // Fake timestamp
      daystamp: '26 Jan 2024  6:33 AM', // Fake daystamp
      created_at: randomDate, // Random date within the last year
      product_name: 'Fake Product', // Fake product name
      product_has_variants: Math.random() > 0.5, // Random boolean for product variants
      price: price,
      gumroad_fee: gumroadFee,
      is_bundle_purchase: false,
      is_bundle_product_purchase: false,
      subscription_duration:
        MEMBERSHIPS[Math.floor(Math.random() * MEMBERSHIPS.length)],
      formatted_display_price: `$${price} a month`, // Fake formatted display price
      formatted_total_price: `$${price} a month`, // Fake formatted total price
      currency_symbol: '$',
      amount_refundable_in_currency: '0',
      product_id: 'fake_product_id', // Fake product ID
      product_permalink: 'fake_permalink', // Fake product permalink
      partially_refunded: false,
      chargedback: false,
      purchase_email: 'fake@example.com', // Fake purchase email
      state: 'KA',
      zip_code: '560002',
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      country_iso2: 'IN',
      paid: false,
      has_variants: false,
      variants: { Tier: TIERS[Math.floor(Math.random() * TIERS.length)] },
      variants_and_quantity: '(Free)',
      has_custom_fields: false,
      custom_fields: {},
      order_id: Math.floor(Math.random() * 1000000), // Random order ID
      is_product_physical: false,
      is_recurring_billing: true,
      can_contact: true,
      is_following: false,
      disputed: false,
      dispute_won: false,
      is_additional_contribution: false,
      discover_fee_charged: false,
      is_upgrade_purchase: false,
      is_more_like_this_recommended: false,
      is_gift_sender_purchase: false,
      is_gift_receiver_purchase: false,
      referrer: 'direct',
      paypal_refund_expired: false,
      card: {
        visual: null,
        type: null,
        bin: null,
        expiry_month: null,
        expiry_year: null,
      },
      product_rating: Math.random() * 5, // Random product rating
      reviews_count: Math.floor(Math.random() * 100), // Random reviews count
      average_rating: Math.random() * 5, // Random average rating
      subscription_id: 'fake_subscription_id', // Fake subscription ID
      cancelled: Math.random() > 0.75,
      dead: false,
      ended: false,
      free_trial_ended: null,
      free_trial_ends_on: null,
      recurring_charge: false,
      quantity: 1,
      affiliate:
        Math.random() > 0.55
          ? null
          : {
              email: 'some@email.com',
              amount: 2.5,
            },
    });
  }

  return sales;
}
