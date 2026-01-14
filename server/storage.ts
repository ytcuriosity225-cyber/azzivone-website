import { type User, type InsertUser, type Order, type InsertOrder, type Hero, type InsertHero, type Product, type InsertProduct, type Review, type InsertReview, type GalleryItem, type InsertGallery } from "@shared/schema";
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

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Gallery
  getGallery(type?: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGallery): Promise<GalleryItem>;

  // Stats
  getStats(): Promise<any[]>;
  updateStats(stats: any[]): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  private products: Map<string, Product>;
  private reviews: Map<string, Review>;
  private gallery: Map<string, GalleryItem>;
  private hero: Hero;
  private stats: any[];

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.gallery = new Map();
    this.stats = [
      { id: 1, label: "Total Revenue", value: "Rs. 1,482,000", change: "+12.5%", trendingUp: true },
      { id: 2, label: "Active Orders", value: "142", change: "+5.2%", trendingUp: true },
      { id: 3, label: "Customer Base", value: "12,942", change: "+18.3%", trendingUp: true },
      { id: 4, label: "Avg. Order Value", value: "Rs. 4,250", change: "-2.1%", trendingUp: false },
      { id: 5, label: "Total Visitors", value: "48,512", change: "+5.2%", trendingUp: true },
      { id: 6, label: "Add to Carts", value: "3,842", change: "+3.1%", trendingUp: true },
      { id: 7, label: "Conversion Rate", value: "4.8%", change: "+0.4%", trendingUp: true },
      { id: 8, label: "Active Sessions", value: "84", change: "+2%", trendingUp: true },
    ];
    this.hero = {
      id: "1",
      title: "Glass-Glow Skin, engineered for people who don’t slow down",
      subtitle: "Experience the 96% pure difference. Repair, hydration, and refinement.",
      ctaText: "Order Now",
      videoUrl: "",
      logoUrl: ""
    };

    // Seed initial reviews
    const initialReviews: InsertReview[] = [
      {
        user: "Sarah K.",
        rating: "5",
        comment: "Absolutely love the texture! My skin has never looked more radiant.",
        date: "2025-12-15",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        type: "text",
        thumbnail: null
      },
      {
        user: "Ahmed R.",
        rating: "4",
        comment: "Great product, noticed a difference in my acne scars within a week.",
        date: "2025-12-20",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
        type: "text",
        thumbnail: null
      }
    ];

    initialReviews.forEach(r => {
      const id = randomUUID() as string;
      this.reviews.set(id, { 
        ...r, 
        id, 
        avatar: r.avatar ?? null, 
        thumbnail: r.thumbnail ?? null,
        type: r.type || "text"
      });
    });

    // Seed initial gallery items
    const initialGallery: InsertGallery[] = [
      { url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", type: "whatsapp" },
      { url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b", type: "delivery" }
    ];

    initialGallery.forEach(item => {
      const id = randomUUID() as string;
      this.gallery.set(id, { ...item, id });
    });

    // Seed initial products
    const initialProducts: Product[] = [
      {
        id: randomUUID() as string,
        name: "Snail Mucin Premium Serum",
        price: "3850",
        inventory: "95",
        status: "Active",
        sales: "0",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
        bullets: [
          "96% pure snail secretion filtrate",
          "Repairs damaged skin barrier",
          "Intense hydration for glass-glow skin"
        ]
      }
    ];

    initialProducts.forEach(p => {
      this.products.set(p.id, p);
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
    const id = randomUUID() as string;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID() as string;
    const order: Order = {
      id,
      name: insertOrder.name,
      phone: insertOrder.phone,
      email: insertOrder.email ?? null,
      address: insertOrder.address,
      city: insertOrder.city,
      quantity: insertOrder.quantity,
      totalPrice: insertOrder.totalPrice,
      paymentMethod: insertOrder.paymentMethod,
      status: "pending",
      notes: insertOrder.notes ?? null,
      courier: insertOrder.courier ?? null
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
    const id = randomUUID() as string;
    const product: Product = {
      id,
      name: insertProduct.name,
      price: insertProduct.price,
      inventory: insertProduct.inventory,
      status: insertProduct.status,
      sales: insertProduct.sales || "0",
      image: insertProduct.image || "",
      bullets: insertProduct.bullets ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, insertProduct: InsertProduct): Promise<Product> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct: Product = {
      id,
      name: insertProduct.name,
      price: insertProduct.price,
      inventory: insertProduct.inventory,
      status: insertProduct.status,
      sales: insertProduct.sales || existingProduct.sales,
      image: insertProduct.image || existingProduct.image,
      bullets: insertProduct.bullets ?? existingProduct.bullets
    };
    
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID() as string;
    const review: Review = { 
      ...insertReview, 
      id, 
      avatar: insertReview.avatar ?? null, 
      thumbnail: insertReview.thumbnail ?? null,
      type: insertReview.type || "text"
    };
    this.reviews.set(id, review);
    return review;
  }

  async getGallery(type?: string): Promise<GalleryItem[]> {
    const items = Array.from(this.gallery.values());
    if (type) return items.filter(i => i.type === type);
    return items;
  }

  async createGalleryItem(insertItem: InsertGallery): Promise<GalleryItem> {
    const id = randomUUID() as string;
    const item: GalleryItem = { ...insertItem, id };
    this.gallery.set(id, item);
    return item;
  }

  async getStats(): Promise<any[]> {
    return this.stats;
  }

  async updateStats(newStats: any[]): Promise<any[]> {
    this.stats = newStats;
    return this.stats;
  }
}

export const storage = new MemStorage();
