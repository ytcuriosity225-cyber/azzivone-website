import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertHeroSchema, insertProductSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Mock data for initial development
  const mockStats = [
    { id: 1, label: "Total Revenue", value: "Rs. 1,250,000", change: "+12.5%", trendingUp: true },
    { id: 2, label: "Active Orders", value: "45", change: "+5.2%", trendingUp: true },
    { id: 3, label: "Customer Base", value: "8,942", change: "+18.3%", trendingUp: true },
    { id: 4, label: "Avg. Order Value", value: "Rs. 3,850", change: "-2.1%", trendingUp: false },
  ];

  const mockReviews = [
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
    }
  ];

  // API Routes
  app.get("/api/dashboard/stats", (_req, res) => res.json(mockStats));
  app.get("/api/dashboard/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });
  app.post("/api/dashboard/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });
  app.patch("/api/dashboard/products/:id", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, productData);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });
  app.get("/api/dashboard/hero", async (_req, res) => {
    // Replacement point for future real backend endpoint
    const hero = await storage.getHero();
    res.json(hero);
  });
  app.post("/api/dashboard/hero", async (req, res) => {
    try {
      // Replacement point for future real backend endpoint
      const heroData = insertHeroSchema.parse(req.body);
      const updatedHero = await storage.updateHero(heroData);
      res.json(updatedHero);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });
  app.get("/api/dashboard/reviews", (_req, res) => res.json(mockReviews));

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/orders", async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  return httpServer;
}
