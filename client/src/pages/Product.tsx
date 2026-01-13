import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Star, ArrowRight, Play, ShoppingCart, Truck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Product() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-600">Trusted by 2,000+ happy users</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Azzivone <span className="text-indigo-600 italic">Snail Mucin</span> Serum
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Wake up to glass skin. Our 96% pure formula repairs damage and locks in moisture for a 24-hour natural glow.
            </p>

            <Link href="/checkout">
              <Button size="lg" className="w-full md:w-auto h-14 px-10 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:scale-105" data-testid="button-hero-checkout">
                Proceed to Secure Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-green-500" /> Secure Payment</span>
              <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-blue-500" /> Fast Shipping</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-100 rounded-3xl -rotate-3 scale-95 opacity-50 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" 
              alt="Azzivone Product Mockup" 
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM → AGITATION → SOLUTION */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2"><span>•</span> Persistent dryness and dullness</li>
                  <li className="flex gap-2"><span>•</span> Visible acne scars and uneven texture</li>
                  <li className="flex gap-2"><span>•</span> Wasting money on ineffective fillers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-slate-900 text-white">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Agitation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Ignoring skin damage leads to premature aging and deeper scarring. Your confidence shouldn't depend on heavy makeup filters. Every day without proper repair is a day your skin loses its natural elasticity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow border-t-4 border-indigo-600">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Solution</h3>
                <p className="text-slate-600 leading-relaxed">
                  Azzivone uses 96% Pure Snail Secretion Filtrate to naturally stimulate collagen and heal the moisture barrier. It's not just a serum; it's a reset button for your skin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. FEATURES → OUTCOMES */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-16">Designed for Transformation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
          {[
            { title: "Pure 96% Mucin", benefit: "Instantly calms irritation and repairs scars" },
            { title: "Hyaluronic Acid Plus", benefit: "Locks in moisture for 24+ hours of hydration" },
            { title: "Lightweight Formula", benefit: "Absorbs in 30 seconds with zero sticky residue" },
            { title: "Ethical Sourcing", benefit: "Cruelty-free production with premium standards" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="h-6 w-6 text-indigo-600 shrink-0" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-slate-600">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHORT VIDEO REVIEWS (HORIZONTAL SCROLL) */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="px-6 mb-10 text-center">
          <h2 className="text-3xl font-bold">Real Reactions</h2>
          <p className="text-slate-500">See why people are switching to Azzivone</p>
        </div>
        
        <div className="flex overflow-x-auto gap-4 px-6 pb-10 no-scrollbar snap-x snap-mandatory">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-[9/16] bg-slate-200 rounded-2xl relative snap-center overflow-hidden flex-shrink-0 group">
              <img 
                src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?auto=format&fit=crop&q=80&w=600`} 
                alt="User Review" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold">"Best serum ever!"</p>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT DELIVERY GALLERY */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Real Deliveries. Real Customers.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556228852-6d3d157a3d71?q=80&w=400&auto=format&fit=crop"
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src={url} alt="Delivery proof" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISUAL PROOF / EXPLAINER */}
      <section className="py-20 bg-indigo-600 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h4 className="font-bold mb-2">Apply</h4>
              <p className="text-indigo-100 text-sm">After cleansing, apply 2 pumps to face and neck.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h4 className="font-bold mb-2">Absorb</h4>
              <p className="text-indigo-100 text-sm">Pat gently for 30 seconds until fully absorbed.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h4 className="font-bold mb-2">Glow</h4>
              <p className="text-indigo-100 text-sm">Follow with moisturizer to lock in the glass skin finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF STACK */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
          </div>
          <h3 className="text-2xl font-bold">4.9/5 Based on 2,400+ Reviews</h3>
        </div>
        
        <div className="space-y-6">
          <blockquote className="p-8 bg-slate-50 rounded-2xl italic text-lg border-l-4 border-indigo-600">
            "I've tried everything for my acne scars, but this is the only thing that actually made a visible difference in 2 weeks. My skin feels like silk."
            <footer className="mt-4 font-bold text-slate-900 not-italic">— Sarah K., Verified Buyer</footer>
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-xl">
              <p className="text-slate-600 mb-4 text-sm">"The texture is so unique. It feels luxurious and my morning redness is completely gone."</p>
              <p className="font-bold text-sm">— Michael R.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <p className="text-slate-600 mb-4 text-sm">"Finally found a serum that doesn't break me out but still hydrates deeply."</p>
              <p className="font-bold text-sm">— Emily T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RISK REVERSAL / TRUST */}
      <section className="py-12 border-y border-slate-100 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-bold text-xl">30-Day Money-Back Guarantee</h4>
              <p className="text-slate-500">No hidden charges. No risk. If you don't love it, we'll refund you.</p>
            </div>
          </div>
          <img src="https://checkout-assets.s3.amazonaws.com/badges/trust-badge.png" alt="Trust Badge" className="h-12 opacity-80" />
        </div>
      </section>

      {/* 9. PRICING PREVIEW */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">LIMITED TIME OFFER</span>
          <h2 className="text-4xl font-bold mb-4">Get the Glass Skin Glow</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-slate-400 line-through text-2xl">$49.00</span>
            <span className="text-5xl font-extrabold text-indigo-600">$29.00</span>
          </div>
          
          <Link href="/checkout">
            <Button size="lg" className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 mb-6" data-testid="button-pricing-checkout">
              Continue to Checkout
            </Button>
          </Link>
          
          <p className="text-slate-500 text-sm">🎁 Bonus: Free "Skin Reset Guide" included ($15 value)</p>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Common Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Who is this for?</AccordionTrigger>
            <AccordionContent>
              Azzivone is formulated for all skin types, especially those with dry, sensitive, or acne-prone skin looking to repair their moisture barrier.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I receive access?</AccordionTrigger>
            <AccordionContent>
              Your order is processed instantly. You'll receive a confirmation email within minutes and shipping tracking within 24 hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it beginner-friendly?</AccordionTrigger>
            <AccordionContent>
              Absolutely. It fits seamlessly into any routine—just apply before your moisturizer. No complex layering required.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Refund / guarantee?</AccordionTrigger>
            <AccordionContent>
              We offer a 30-day "Empty Bottle" guarantee. If you don't see results, just return it for a full refund.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Support availability?</AccordionTrigger>
            <AccordionContent>
              Our skincare experts are available 24/7 via email or chat to help you with your routine.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* STICKY CTA ON MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 md:hidden z-50">
        <Link href="/checkout">
          <Button className="w-full h-12 bg-indigo-600 font-bold" data-testid="button-sticky-checkout">
            Order Now - $29.00
          </Button>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; 2026 Azzivone Skincare. All rights reserved.</p>
      </footer>
    </div>
  );
}
