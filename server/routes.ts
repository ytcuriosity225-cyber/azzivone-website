import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertHeroSchema, insertProductSchema, insertReviewSchema, insertGallerySchema } from "@shared/schema";

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
    const hero = await storage.getHero();
    res.json(hero);
  });
  app.post("/api/dashboard/hero", async (req, res) => {
    try {
      const heroData = insertHeroSchema.parse(req.body);
      const updatedHero = await storage.updateHero(heroData);
      res.json(updatedHero);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Reviews
  app.get("/api/dashboard/reviews", async (_req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });
  app.post("/api/dashboard/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Gallery
  app.get("/api/dashboard/gallery", async (req, res) => {
    const type = req.query.type as string;
    const items = await storage.getGallery(type);
    res.json(items);
  });
  app.post("/api/dashboard/gallery", async (req, res) => {
    try {
      const galleryData = insertGallerySchema.parse(req.body);
      const item = await storage.createGalleryItem(galleryData);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

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
