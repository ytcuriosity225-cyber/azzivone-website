import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  quantity: text("quantity").notNull(),
  totalPrice: text("total_price").notNull(),
  paymentMethod: text("payment_method").notNull(),
  courier: text("courier"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const heroContent = pgTable("hero_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  ctaText: text("cta_text").notNull(),
  videoUrl: text("video_url"),
  logoUrl: text("logo_url"),
});

export const insertHeroSchema = createInsertSchema(heroContent).omit({
  id: true,
});

export type InsertHero = z.infer<typeof insertHeroSchema>;
export type Hero = typeof heroContent.$inferSelect;

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  price: text("price").notNull(),
  inventory: text("inventory").notNull(),
  sales: text("sales").notNull().default("0"),
  status: text("status").notNull(),
  image: text("image").notNull(),
  bullets: text("bullets").array(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  user: text("user").notNull(),
  rating: text("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  avatar: text("avatar"),
  type: text("type").notNull().default("text"), // text, video
  thumbnail: text("thumbnail"),
});

export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  type: text("type").notNull(), // whatsapp, delivery, doctor
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type GalleryItem = typeof gallery.$inferSelect;

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
