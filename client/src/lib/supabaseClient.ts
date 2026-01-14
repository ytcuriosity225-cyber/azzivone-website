import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Use the anon key supplied for client-side read/inserts (authenticated users)
const SUPABASE_URL = "https://zburevdajshgcsfqawel.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cmV2bmFkanNoZ2NzZnFhbXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTE0OTEsImV4cCI6MjA4Mzk4NzQ5MX0.OY_3KTtIEcBN-6p_jTf6y-r6Son6UThjMXBmUKl9p0";

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Map Supabase product rows to the frontend Product shape (strings for shared/schema compatibility)
export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return (data || []).map((p: any) => ({
    id: String(p.id),
    name: p.name,
    price: String(p.price),
    inventory: String(p.inventory ?? 0),
    status: p.status ?? "",
    sales: String(p.sales ?? 0),
    image: p.image ?? "",
    bullets: p.bullets ?? [],
  }));
}

export async function fetchReviews() {
  const { data, error } = await supabase.from("reviews").select("*");
  if (error) throw error;
  return data || [];
}

export async function fetchHero() {
  // try hero_content first (shared/schema), fallback to hero
  let resp = await supabase.from("hero_content").select("*").limit(1).maybeSingle();
  if (resp.error) {
    resp = await supabase.from("hero").select("*").limit(1).maybeSingle();
  }
  if (resp.error && resp.error.code !== "PGRST116") throw resp.error;
  return resp.data || null;
}

export async function createOrder(payload: any) {
  // Validate product exists and compute price on the client (server should still verify)
  const { data: product, error: pError } = await supabase.from("products").select("id, price").eq("id", payload.product_id).single();
  if (pError || !product) {
    throw new Error("Product not found");
  }

  const quantity = Number(payload.quantity || 1);
  const total = Number(product.price) * quantity;

  const insertPayload = {
    product_id: payload.product_id,
    quantity: String(quantity),
    totalPrice: String(total),
    name: payload.name ?? null,
    phone: payload.phone ?? null,
    email: payload.email ?? null,
    address: payload.address ?? null,
    city: payload.city ?? null,
    paymentMethod: payload.paymentMethod ?? null,
    courier: payload.courier ?? null,
    notes: payload.notes ?? null,
  };

  const { data, error } = await supabase.from("orders").insert([insertPayload]);
  if (error) throw error;
  return data;
}
