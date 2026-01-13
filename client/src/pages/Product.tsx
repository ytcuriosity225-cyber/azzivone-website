import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Star, ArrowRight, Play, ShoppingCart, Truck, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Assets
import productHero from "@assets/1_1768298491722.png";
import productDisplay from "@assets/2_1768298491725.png";
import productClean from "@assets/3_1768298491725.png";
import productBathroom from "@assets/4_1768298491727.png";
import productHand from "@assets/5_1768298491727.png";
import productTexture from "@assets/6_1768298491727.png";
import productLifestyle from "@assets/7_1768298491728.png";
import logo from "@assets/logo_1768257103773.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Product() {
  return (
    <div className="min-h-screen bg-cream font-body text-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={logo} alt="Azzivone" className="h-8 md:h-10 cursor-pointer" data-testid="logo-nav" />
          </Link>
          <Link href="/checkout">
            <button 
              className="bg-gold text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-body font-semibold text-xs md:text-sm tracking-wide hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-order-nav"
            >
              Order Now
            </button>
          </Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-gold">Trusted by 2,000+ happy users</p>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl text-dark leading-tight mb-6">
              Azzivone <span className="text-gold italic">Snail Mucin</span> Serum
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-body">
              Wake up to glass skin. Our 96% pure formula repairs damage and locks in moisture for a 24-hour natural glow.
            </p>

            <Link href="/checkout">
              <button 
                className="gold-gradient text-white px-8 md:px-10 py-4 rounded-full font-body font-bold text-base md:text-lg tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/30 flex items-center gap-2"
                data-testid="button-hero-checkout"
              >
                Proceed to Secure Checkout <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
            
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-gold" /> Secure Payment</span>
              <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-gold" /> Fast Shipping</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gold/5 rounded-3xl -rotate-3" />
            <img 
              src={productHero} 
              alt="Azzivone Product Mockup" 
              className="relative rounded-3xl elegant-shadow w-full object-cover aspect-[4/5] float-animation"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM → AGITATION → SOLUTION */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none bg-cream/50 shadow-none hover:bg-cream transition-colors">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl mb-4 text-dark">The Problem</h3>
                <ul className="space-y-3 text-muted-foreground font-body">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-1" /> Persistent dryness and dullness</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-1" /> Visible acne scars and texture</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-1" /> Wasting money on fillers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-dark text-white transform md:-translate-y-4">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gold/20 text-gold rounded-full flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <h3 className="font-display text-2xl mb-4">The Agitation</h3>
                <p className="text-white/70 leading-relaxed font-body">
                  Ignoring skin damage leads to premature aging and deeper scarring. Your confidence shouldn't depend on filters. Every day without proper repair is a day your skin loses elasticity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-gold text-white shadow-none">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl mb-4">The Solution</h3>
                <p className="text-white/90 leading-relaxed font-body">
                  Azzivone uses 96% Pure Snail Secretion Filtrate to naturally stimulate collagen and heal the moisture barrier. It's a reset button for your skin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. FEATURES → OUTCOMES */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl text-dark mb-16">Designed for <span className="italic text-gold">Transformation</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
          {[
            { title: "Pure 96% Mucin", benefit: "Instantly calms irritation and repairs scars" },
            { title: "Hyaluronic Acid Plus", benefit: "Locks in moisture for 24+ hours of hydration" },
            { title: "Lightweight Formula", benefit: "Absorbs in 30 seconds with zero sticky residue" },
            { title: "Ethical Sourcing", benefit: "Cruelty-free production with premium standards" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="mt-1"><CheckCircle2 className="h-6 w-6 text-gold shrink-0 group-hover:scale-110 transition-transform" /></div>
              <div>
                <h4 className="font-display text-xl mb-1 text-dark">{item.title}</h4>
                <p className="text-muted-foreground font-body">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHORT VIDEO REVIEWS */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="px-6 mb-12 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-dark mb-4">Real <span className="italic text-gold">Reactions</span></h2>
          <p className="font-body text-muted-foreground">See why thousands are switching to Azzivone</p>
        </div>
        
        <div className="flex overflow-x-auto gap-6 px-6 pb-10 no-scrollbar snap-x snap-mandatory">
          {[productHand, productTexture, productLifestyle, productBathroom].map((img, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-[9/16] bg-white rounded-3xl relative snap-center overflow-hidden flex-shrink-0 group elegant-shadow">
              <img 
                src={img} 
                alt="User Review" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-display text-xl">"Pure Magic!"</p>
                <div className="flex text-gold mt-1">
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
          <h2 className="font-display text-3xl md:text-5xl text-dark">Real Deliveries. <span className="italic text-gold">Real Customers.</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[productDisplay, productClean, productBathroom, productLifestyle].map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              <img src={url} alt="Delivery proof" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISUAL PROOF / EXPLAINER */}
      <section className="py-20 bg-dark text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl mb-12">How It <span className="italic text-gold">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-gold/20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 font-display text-2xl text-gold">1</div>
              <h4 className="font-display text-xl mb-3">Apply</h4>
              <p className="text-white/60 font-body text-sm">After cleansing, apply 2 pumps to face and neck.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gold/20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 font-display text-2xl text-gold">2</div>
              <h4 className="font-display text-xl mb-3">Absorb</h4>
              <p className="text-white/60 font-body text-sm">Pat gently for 30 seconds until fully absorbed.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gold/20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 font-display text-2xl text-gold">3</div>
              <h4 className="font-display text-xl mb-3">Glow</h4>
              <p className="text-white/60 font-body text-sm">Follow with moisturizer to lock in the glass skin finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF STACK */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex text-gold mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-8 w-8 fill-current" />)}
          </div>
          <h3 className="font-display text-3xl md:text-4xl text-dark">4.9/5 Based on 2,400+ Reviews</h3>
        </div>
        
        <div className="space-y-8">
          <blockquote className="p-10 bg-white rounded-3xl italic text-xl md:text-2xl elegant-shadow relative border-l-8 border-gold">
            <span className="absolute top-4 left-4 text-gold/20 text-6xl font-serif">"</span>
            "I've tried everything for my acne scars, but this is the only thing that actually made a visible difference in 2 weeks. My skin feels like silk."
            <footer className="mt-6 font-body font-bold text-dark not-italic flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10" />
              Sarah K., Verified Buyer
            </footer>
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-gold/10 rounded-2xl elegant-shadow">
              <p className="text-muted-foreground mb-6 font-body italic">"The texture is so unique. It feels luxurious and my morning redness is completely gone."</p>
              <p className="font-body font-bold text-dark">— Michael R.</p>
            </div>
            <div className="p-8 bg-white border border-gold/10 rounded-2xl elegant-shadow">
              <p className="text-muted-foreground mb-6 font-body italic">"Finally found a serum that doesn't break me out but still hydrates deeply."</p>
              <p className="font-body font-bold text-dark">— Emily T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RISK REVERSAL / TRUST */}
      <section className="py-16 bg-cream/50 border-y border-gold/10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div>
              <h4 className="font-display text-2xl text-dark mb-1">30-Day Glow Guarantee</h4>
              <p className="text-muted-foreground font-body">No hidden charges. No risk. Love it or your money back.</p>
            </div>
          </div>
          <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
          </div>
        </div>
      </section>

      {/* 9. PRICING PREVIEW */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 opacity-50" />
        <div className="max-w-xl mx-auto text-center relative z-10">
          <span className="inline-block px-6 py-2 bg-gold text-white rounded-full text-xs font-bold tracking-widest mb-6 uppercase">LIMITED TIME OFFER</span>
          <h2 className="font-display text-4xl md:text-6xl text-dark mb-6">Get the <span className="italic text-gold">Glass Skin</span> Glow</h2>
          <div className="flex items-center justify-center gap-6 mb-10">
            <span className="text-muted-foreground line-through text-2xl font-body">Rs. 5,000</span>
            <span className="text-6xl font-display text-gold">Rs. 3,500</span>
          </div>
          
          <Link href="/checkout">
            <button 
              className="gold-gradient text-white w-full py-5 rounded-full font-body font-bold text-xl tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/30 mb-8"
              data-testid="button-pricing-checkout"
            >
              Continue to Checkout
            </button>
          </Link>
          
          <div className="flex items-center justify-center gap-2 text-gold font-body font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Bonus: Free "Skin Reset Guide" included</span>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-dark mb-12 text-center">Common <span className="italic text-gold">Questions</span></h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "Who is this for?", a: "Azzivone is formulated for all skin types, especially those with dry, sensitive, or acne-prone skin looking to repair their moisture barrier." },
            { q: "How do I receive access?", a: "Your order is processed instantly. You'll receive a confirmation email within minutes and shipping tracking within 24 hours." },
            { q: "Is it beginner-friendly?", a: "Absolutely. It fits seamlessly into any routine—just apply before your moisturizer. No complex layering required." },
            { q: "Refund / guarantee?", a: "We offer a 30-day \"Empty Bottle\" guarantee. If you don't see results, just return it for a full refund." },
            { q: "Support availability?", a: "Our skincare experts are available 24/7 via email or chat to help you with your routine." }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-gold/10 rounded-2xl px-6 bg-white overflow-hidden">
              <AccordionTrigger className="font-display text-lg text-dark hover:no-underline py-6">{faq.q}</AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* STICKY CTA ON MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-cream/90 backdrop-blur-md border-t border-gold/10 md:hidden z-50">
        <Link href="/checkout">
          <button 
            className="gold-gradient text-white w-full h-14 rounded-full font-body font-bold shadow-lg shadow-gold/20" 
            data-testid="button-sticky-checkout"
          >
            Order Now - Rs. 3,500
          </button>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-gold/10 text-center bg-cream">
        <img src={logo} alt="Azzivone" className="h-8 mx-auto mb-8 opacity-50" />
        <p className="font-body text-muted-foreground text-sm">&copy; 2026 Azzivone Skincare. Crafted for your radiance.</p>
      </footer>
    </div>
  );
}

// Custom Icons
function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
