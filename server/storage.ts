import { type User, type InsertUser, type Order, type InsertOrder, type Hero, type InsertHero } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  private hero: Hero;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.hero = {
      id: "1",
      title: "Glass-Glow Skin, engineered for people who don’t slow down",
      subtitle: "Experience the 96% pure difference. Repair, hydration, and refinement.",
      ctaText: "Order Now",
      videoUrl: "",
      logoUrl: ""
    };
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
    this.hero = { ...hero, id: "1" };
    return this.hero;
  }
}

export const storage = new MemStorage();
