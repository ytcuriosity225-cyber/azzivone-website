/**
 * Mock API Data for React Admin Dashboard
 * This file provides placeholder data for statistics, products, hero section, and reviews.
 * Each object follows a GET/POST structure simulation.
 */

// 1. /api/dashboard/stats
// GET/POST data for dashboard overview statistics
export const stats = [
  { id: 1, label: "Total Revenue", value: "Rs. 1,250,000", change: "+12.5%", trendingUp: true },
  { id: 2, label: "Active Orders", value: "45", change: "+5.2%", trendingUp: true },
  { id: 3, label: "Customer Base", value: "8,942", change: "+18.3%", trendingUp: true },
  { id: 4, label: "Avg. Order Value", value: "Rs. 3,850", change: "-2.1%", trendingUp: false },
];

// 2. /api/dashboard/products
// GET/POST structure for product inventory and catalog
export const products = [
  {
    id: 1,
    name: "Snail Mucin Serum",
    price: 3500,
    inventory: 124,
    sales: 856,
    status: "In Stock",
    image: "/src/assets/4_1768257083474.png",
    bullets: ["96% Pure Snail Mucin", "Deep 24h Hydration", "Repairs Acne Scars", "Cruelty-Free"]
  },
  {
    id: 2,
    name: "Ceramide Barrier Cream",
    price: 4200,
    inventory: 0,
    sales: 432,
    status: "Out of Stock",
    image: "/src/assets/WhatsApp_Image_2026-01-12_at_2.29.15_PM_(1)_1768257023865.jpeg",
    bullets: ["Calms Redness", "Barrier Repair", "Vitamin B5 Rich", "All-Night Glow"]
  }
];

// 3. /api/dashboard/hero
// GET/POST structure for hero section content updates
export const heroContent = {
  title: "Glass-Glow Skin, engineered for people who don’t slow down",
  subtitle: "Experience the 96% pure difference. Repair, hydration, and refinement.",
  ctaText: "Order Now",
  videoUrl: "/src/assets/HERO_VIDEO_1768257063489.mp4",
  logoUrl: "/src/assets/logo_1768257103773.png"
};

// 4. /api/dashboard/reviews
// GET/POST structure for customer feedback and ratings
export const reviews = [
  {
    id: 1,
    user: "Sarah K.",
    rating: 5,
    comment: "Absolutely love the texture! My skin has never looked more radiant.",
    date: "2025-12-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    user: "Ahmed R.",
    rating: 4,
    comment: "Great product, noticed a difference in my acne scars within a week.",
    date: "2025-12-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
  },
  {
    id: 3,
    user: "Zainab M.",
    rating: 5,
    comment: "The only serum that actually keeps my skin hydrated all day long.",
    date: "2026-01-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab"
  }
];
