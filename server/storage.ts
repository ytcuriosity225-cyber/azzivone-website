import { type User, type InsertUser, type Order, type InsertOrder, type Hero, type InsertHero, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;

  // Hero
  getHero(): Promise<Hero>;
  updateHero(hero: InsertHero): Promise<Hero>;

  // Products
  getProducts(): Promise<Product[]>;
  updateProduct(id: string, product: InsertProduct): Promise<Product>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  private products: Map<string, Product>;
  private hero: Hero;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.products = new Map();
    this.hero = {
      id: "1",
      title: "Glass-Glow Skin, engineered for people who don’t slow down",
      subtitle: "Experience the 96% pure difference. Repair, hydration, and refinement.",
      ctaText: "Order Now",
      videoUrl: "",
      logoUrl: ""
    };

    // Seed initial products
    const initialProducts: InsertProduct[] = [
      {
        name: "Snail Mucin Serum",
        price: "3500",
        inventory: "124",
        sales: "856",
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
        bullets: ["96% Pure Snail Mucin", "Deep 24h Hydration", "Repairs Acne Scars", "Cruelty-Free"]
      },
      {
        name: "Ceramide Barrier Cream",
        price: "4200",
        inventory: "0",
        sales: "432",
        status: "Out of Stock",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
        bullets: ["Calms Redness", "Barrier Repair", "Vitamin B5 Rich", "All-Night Glow"]
      }
    ];
    
    initialProducts.forEach(p => {
      const id = randomUUID();
      this.products.set(id, { 
        ...p, 
        id, 
        sales: p.sales || "0",
        bullets: p.bullets ?? null
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      email: insertOrder.email ?? null,
      notes: insertOrder.notes ?? null,
      courier: insertOrder.courier ?? null,
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getHero(): Promise<Hero> {
    return this.hero;
  }

  async updateHero(hero: InsertHero): Promise<Hero> {
    this.hero = { 
      ...hero, 
      id: "1",
      videoUrl: hero.videoUrl ?? null,
      logoUrl: hero.logoUrl ?? null
    };
    return this.hero;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      sales: insertProduct.sales || "0",
      bullets: insertProduct.bullets ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, insertProduct: InsertProduct): Promise<Product> {
    const existing = this.products.get(id);
    if (!existing) throw new Error("Product not found");
    const updated: Product = { 
      ...insertProduct, 
      id, 
      sales: insertProduct.sales || existing.sales,
      bullets: insertProduct.bullets ?? null
    };
    this.products.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
