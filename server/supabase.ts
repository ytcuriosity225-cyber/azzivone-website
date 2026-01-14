import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;

/**
 * Reusable Supabase client
 * Using Service Role Key for backend administrative tasks (orders management)
 * and respecting RLS for client-side operations via Anon Key if needed.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetches all products from public.products
 * Replacement for mock product data
 */
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error.message);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
  return data;
}

/**
 * Fetches all orders from public.orders
 * Used for admin dashboard
 */
export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(name)');
  
  if (error) {
    console.error('Error fetching orders:', error.message);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
  return data;
}

/**
 * Creates a new order in public.orders
 * Validates product existence and price consistency before insertion
 */
export async function createOrder(orderData: {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  product_id: string;
  price: number;
}) {
  // 1. Validate product existence and price
  const { data: product, error: pError } = await supabase
    .from('products')
    .select('price')
    .eq('id', orderData.product_id)
    .single();

  if (pError || !product) {
    throw new Error('Invalid product_id: Product does not exist.');
  }

  if (Number(product.price) !== orderData.price) {
    throw new Error(`Price mismatch: Expected ${product.price}, got ${orderData.price}`);
  }

  // 2. Insert order
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: orderData.customer_name,
        phone: orderData.phone,
        email: orderData.email,
        address: orderData.address,
        product_id: orderData.product_id,
        price: orderData.price,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error.message);
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return data;
}
