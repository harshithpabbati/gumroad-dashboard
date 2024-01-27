import { Sale, TimePeriod } from '@/types/sale';

function generateFakeSales(): Sale[] {
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
      subscription_duration: 'monthly',
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
      country: 'India',
      country_iso2: 'IN',
      paid: false,
      has_variants: false,
      variants: { Tier: 'Free' },
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
      cancelled: false,
      dead: false,
      ended: false,
      free_trial_ended: null,
      free_trial_ends_on: null,
      recurring_charge: false,
      quantity: 1,
    });
  }

  return sales;
}

export function calculateSalesVolume(
  sales: Sale[],
  {
    period = 'week',
    generateFake = false,
    type = 'gross',
  }: { period?: TimePeriod; generateFake?: boolean; type?: 'gross' | 'net' }
): { name: string; revenue: number }[] {
  let newSalesData = sales;

  if (generateFake) {
    newSalesData = generateFakeSales();
  }

  const startDate = new Date();
  switch (period) {
    case 'week':
      startDate.setDate(startDate.getDate() - 7 * 7);
      break;
    case 'month':
      startDate.setMonth(startDate.getMonth() - 12);
      break;
    default:
      break;
  }

  const dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    period === 'week'
      ? d.setDate(d.getDate() - 1)
      : d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    switch (period) {
      case 'week':
        salesData[date.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
        break;
      case 'month':
        salesData[
          date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        ] = 0;
        break;
      default:
        break;
    }
  });

  newSalesData.forEach((sale) => {
    const date = new Date(sale.created_at);
    let key;
    switch (period) {
      case 'month':
        key = date.toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit',
        });
        break;
      case 'week':
      default:
        key = date.toLocaleDateString('en-US', { weekday: 'short' });
        break;
    }
    salesData[key] +=
      type === 'gross' ? sale.price : Math.round(sale.price - sale.gumroad_fee);
  });

  return Object.keys(salesData)
    .map((key) => ({
      name: key,
      revenue: salesData[key],
    }))
    .reverse();
}
