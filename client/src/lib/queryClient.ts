import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { fetchProducts, fetchReviews, fetchHero, createOrder } from "./supabaseClient";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// VITE_API_URL can be set to your PHP backend URL (e.g., https://api.azzivone.com)
// When deploying, ensure CORS is handled on the PHP side.
const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Route some API calls to Supabase client helpers
  // POST /api/orders -> Supabase insert
  if (method.toUpperCase() === "POST" && url === "/api/orders") {
    const created = await createOrder(data);
    // Return a minimal Response-like object with json()
    return { ok: true, status: 200, json: async () => created } as unknown as Response;
  }

  // Fallback to existing REST API base
  const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const path = queryKey.join("/");

    // Route certain query keys to Supabase helper functions
    if (path.includes("/api/dashboard/products") || path === "/api/dashboard/products") {
      return await fetchProducts();
    }

    if (path.includes("/api/dashboard/reviews") || path === "/api/dashboard/reviews") {
      return await fetchReviews();
    }

    if (path.includes("/api/dashboard/hero") || path === "/api/dashboard/hero") {
      return await fetchHero();
    }

    const fullUrl = path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
