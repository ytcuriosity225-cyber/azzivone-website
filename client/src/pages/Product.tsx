import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Star, ArrowRight, Play, ShoppingCart, Truck, Zap, ChevronRight, Heart, Sparkles as SparklesIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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

const FloatingIcons = () => {
  const [icons, setIcons] = useState<{ id: number; x: number; y: number; type: 'heart' | 'cart'; delay: number }[]>([]);

  useEffect(() => {
    const newIcons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: Math.random() > 0.5 ? 'heart' as const : 'cart' as const,
      delay: Math.random() * 5
    }));
    setIcons(newIcons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      <AnimatePresence>
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ y: "110vh", x: `${icon.x}vw`, opacity: 0 }}
            animate={{ 
              y: "-10vh",
              opacity: [0, 1, 1, 0],
              x: [`${icon.x}vw`, `${icon.x + (Math.random() * 10 - 5)}vw`]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: icon.delay,
              ease: "linear"
            }}
            className="absolute"
          >
            {icon.type === 'heart' ? (
              <Heart className="w-6 h-6 text-gold fill-gold" />
            ) : (
              <ShoppingCart className="w-6 h-6 text-gold" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Product() {
  return (
    <div className="min-h-screen bg-cream font-body text-dark relative">
      <FloatingIcons />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={logo} alt="Azzivone" className="h-16 md:h-24 cursor-pointer transform hover:scale-105 transition-transform" data-testid="logo-nav" />
          </Link>
          <Link href="/checkout">
            <button 
              className="bg-gold text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-body font-bold text-sm md:text-base tracking-wide hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-order-nav"
            >
              Order Now
            </button>
          </Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-base font-bold text-gold bg-gold/5 px-4 py-1 rounded-full border border-gold/10">Trusted by 2,000+ happy users</p>
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl text-dark leading-[1.1] mb-8">
              Azzivone <span className="text-gold italic">Snail Mucin</span> Serum
            </h1>
            
            <p className="text-2xl text-dark mb-10 leading-relaxed font-body font-medium">
              Wake up to glass skin. Our 96% pure formula repairs damage and locks in moisture for a 24-hour natural glow.
            </p>

            <Link href="/checkout">
              <button 
                className="gold-gradient text-white px-10 md:px-14 py-5 rounded-full font-body font-black text-xl md:text-2xl tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl shadow-gold/40 flex items-center gap-3"
                data-testid="button-hero-checkout"
              >
                Proceed to Secure Checkout <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </button>
            </Link>
            
            <div className="mt-10 flex items-center gap-6 text-base text-dark font-bold">
              <span className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl border border-gold/10"><ShieldCheck className="h-5 w-5 text-gold" /> Secure Payment</span>
              <span className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl border border-gold/10"><Truck className="h-5 w-5 text-gold" /> Fast Shipping</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gold/10 rounded-full blur-3xl opacity-50" />
            <img 
              src={productHero} 
              alt="Azzivone Product Mockup" 
              className="relative rounded-[3rem] elegant-shadow w-full object-cover aspect-[4/5] float-animation border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM → AGITATION → SOLUTION */}
      <section className="py-24 bg-white px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gold/5 bg-cream/30 shadow-none hover:bg-cream transition-colors rounded-[2rem]">
              <CardContent className="pt-10 px-8 pb-10">
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-8">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl mb-6 text-dark font-bold">The Problem</h3>
                <ul className="space-y-4 text-dark font-body font-medium text-lg">
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-1" /> Persistent dryness and dullness</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-1" /> Visible acne scars and texture</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-1" /> Wasting money on fillers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-dark text-white transform md:-translate-y-8 rounded-[2rem]">
              <CardContent className="pt-10 px-8 pb-10">
                <div className="w-16 h-16 bg-gold/20 text-gold rounded-2xl flex items-center justify-center mb-8">
                  <Star className="h-8 w-8 fill-current" />
                </div>
                <h3 className="font-display text-3xl mb-6 font-bold">The Agitation</h3>
                <p className="text-white/80 leading-relaxed font-body text-lg">
                  Ignoring skin damage leads to premature aging and deeper scarring. Your confidence shouldn't depend on filters. Every day without proper repair is a day your skin loses elasticity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold/5 bg-gold text-white shadow-none rounded-[2rem]">
              <CardContent className="pt-10 px-8 pb-10">
                <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8">
                  <SparklesIcon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl mb-6 font-bold">The Solution</h3>
                <p className="text-white/90 leading-relaxed font-body text-lg font-medium">
                  Azzivone uses 96% Pure Snail Secretion Filtrate to naturally stimulate collagen and heal the moisture barrier. It's a reset button for your skin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. FEATURES → OUTCOMES */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl text-dark mb-20 font-bold">Designed for <span className="italic text-gold">Transformation</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left">
          {[
            { title: "Pure 96% Mucin", benefit: "Instantly calms irritation and repairs scars" },
            { title: "Hyaluronic Acid Plus", benefit: "Locks in moisture for 24+ hours of hydration" },
            { title: "Lightweight Formula", benefit: "Absorbs in 30 seconds with zero sticky residue" },
            { title: "Ethical Sourcing", benefit: "Cruelty-free production with premium standards" }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 group bg-white p-8 rounded-[2rem] border border-gold/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="mt-1"><CheckCircle2 className="h-8 w-8 text-gold shrink-0 group-hover:scale-110 transition-transform" /></div>
              <div>
                <h4 className="font-display text-2xl mb-2 text-dark font-bold">{item.title}</h4>
                <p className="text-dark/70 font-body text-lg font-medium">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SWIPEABLE SHORT VIDEO REVIEWS */}
      <section className="py-24 bg-cream overflow-hidden relative z-10">
        <div className="px-6 mb-16 text-center">
          <h2 className="font-display text-4xl md:text-6xl text-dark mb-6 font-bold">Real <span className="italic text-gold">Reactions</span></h2>
          <p className="font-body text-xl text-dark/70 font-medium max-w-2xl mx-auto">Short video reviews from our amazing community. Swipe to see the glow!</p>
        </div>
        
        <div className="flex overflow-x-auto gap-8 px-6 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing max-w-7xl mx-auto">
          {[productHand, productTexture, productLifestyle, productBathroom, productHand, productTexture].map((img, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[360px] aspect-[9/16] bg-white rounded-[2.5rem] relative snap-center overflow-hidden flex-shrink-0 group elegant-shadow border-4 border-white">
              <img 
                src={img} 
                alt="User Review" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="h-10 w-10 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-10 left-8 right-8 text-white">
                <p className="font-display text-2xl font-bold mb-2">"This glow is insane!"</p>
                <div className="flex text-gold gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-body text-sm mt-4 text-white/80">Verified Reviewer • 2 days ago</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Swipe indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1.5 rounded-full bg-gold/30 ${i === 0 ? 'w-8 bg-gold' : 'w-2'}`} />
          ))}
        </div>
      </section>

      {/* 5. PRODUCT DELIVERY GALLERY */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-dark font-bold">Real Deliveries. <span className="italic text-gold">Real Customers.</span></h2>
          <p className="font-body text-xl text-dark/70 mt-6 font-medium">Unboxing happiness every single day.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[productDisplay, productClean, productBathroom, productLifestyle].map((url, i) => (
            <div key={i} className="aspect-square rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white">
              <img src={url} alt="Delivery proof" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISUAL PROOF / EXPLAINER */}
      <section className="py-24 bg-dark text-white px-6 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl mb-16 font-bold">How It <span className="italic text-gold">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="relative group">
              <div className="w-24 h-24 bg-gold/10 border-2 border-gold/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8 font-display text-4xl text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">1</div>
              <h4 className="font-display text-2xl mb-4 font-bold">Apply</h4>
              <p className="text-white/70 font-body text-lg leading-relaxed">After cleansing, apply 2 pumps to face and neck.</p>
            </div>
            <div className="relative group">
              <div className="w-24 h-24 bg-gold/10 border-2 border-gold/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8 font-display text-4xl text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">2</div>
              <h4 className="font-display text-2xl mb-4 font-bold">Absorb</h4>
              <p className="text-white/70 font-body text-lg leading-relaxed">Pat gently for 30 seconds until fully absorbed.</p>
            </div>
            <div className="relative group">
              <div className="w-24 h-24 bg-gold/10 border-2 border-gold/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8 font-display text-4xl text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">3</div>
              <h4 className="font-display text-2xl mb-4 font-bold">Glow</h4>
              <p className="text-white/70 font-body text-lg leading-relaxed">Follow with moisturizer to lock in the glass skin finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF STACK */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="flex text-gold mb-6 gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-10 w-10 fill-current" />)}
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-dark font-bold">4.9/5 Based on 2,400+ Reviews</h3>
        </div>
        
        <div className="space-y-12">
          <blockquote className="p-12 bg-white rounded-[3rem] italic text-2xl md:text-3xl elegant-shadow relative border-l-[12px] border-gold">
            <span className="absolute top-6 left-6 text-gold/10 text-9xl font-serif select-none">"</span>
            <p className="relative z-10 text-dark leading-tight">"I've tried everything for my acne scars, but this is the only thing that actually made a visible difference in 2 weeks. My skin feels like silk."</p>
            <footer className="mt-10 font-body font-bold text-dark not-italic flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display text-2xl">S</div>
              <div className="text-lg">Sarah K., <span className="text-gold">Verified Buyer</span></div>
            </footer>
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 bg-white border border-gold/10 rounded-[2.5rem] elegant-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform" />
              <p className="text-dark/80 mb-8 font-body text-xl italic font-medium relative z-10">"The texture is so unique. It feels luxurious and my morning redness is completely gone."</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold">M</div>
                <p className="font-body font-bold text-dark text-lg">— Michael R.</p>
              </div>
            </div>
            <div className="p-10 bg-white border border-gold/10 rounded-[2.5rem] elegant-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform" />
              <p className="text-dark/80 mb-8 font-body text-xl italic font-medium relative z-10">"Finally found a serum that doesn't break me out but still hydrates deeply."</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold">E</div>
                <p className="font-body font-bold text-dark text-lg">— Emily T.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RISK REVERSAL / TRUST */}
      <section className="py-20 bg-cream border-y border-gold/20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-gold text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-xl shadow-gold/20">
              <ShieldCheck className="h-12 w-12" />
            </div>
            <div>
              <h4 className="font-display text-3xl text-dark mb-2 font-bold">30-Day Glow Guarantee</h4>
              <p className="text-dark/60 font-body text-xl font-medium leading-relaxed">No hidden charges. No risk. Love it or your money back.</p>
            </div>
          </div>
          <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-10" />
          </div>
        </div>
      </section>

      {/* 9. PRICING PREVIEW */}
      <section className="py-32 px-6 bg-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gold/5 opacity-50" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block px-8 py-3 bg-gold text-white rounded-full text-sm font-black tracking-[0.2em] mb-8 uppercase shadow-xl shadow-gold/30"
          >
            LIMITED TIME OFFER
          </motion.span>
          <h2 className="font-display text-5xl md:text-7xl text-dark mb-10 font-bold leading-tight">Get the <span className="italic text-gold underline decoration-gold/20 underline-offset-8">Glass Skin</span> Glow</h2>
          <div className="flex items-center justify-center gap-8 mb-14">
            <span className="text-dark/30 line-through text-4xl font-body font-bold">Rs. 5,000</span>
            <span className="text-7xl md:text-8xl font-display text-gold font-black drop-shadow-sm">Rs. 3,500</span>
          </div>
          
          <Link href="/checkout">
            <button 
              className="gold-gradient text-white w-full py-6 rounded-full font-body font-black text-2xl md:text-3xl tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl shadow-gold/40 mb-10"
              data-testid="button-pricing-checkout"
            >
              Continue to Checkout
            </button>
          </Link>
          
          <div className="flex items-center justify-center gap-3 text-gold font-body font-black text-xl">
            <SparklesIcon className="h-6 w-6" />
            <span>Bonus: Free "Skin Reset Guide" included</span>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-32 px-6 max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-4xl md:text-6xl text-dark mb-16 text-center font-bold">Common <span className="italic text-gold">Questions</span></h2>
        <Accordion type="single" collapsible className="w-full space-y-6">
          {[
            { q: "Who is this for?", a: "Azzivone is formulated for all skin types, especially those with dry, sensitive, or acne-prone skin looking to repair their moisture barrier." },
            { q: "How do I receive access?", a: "Your order is processed instantly. You'll receive a confirmation email within minutes and shipping tracking within 24 hours." },
            { q: "Is it beginner-friendly?", a: "Absolutely. It fits seamlessly into any routine—just apply before your moisturizer. No complex layering required." },
            { q: "Refund / guarantee?", a: "We offer a 30-day \"Empty Bottle\" guarantee. If you don't see results, just return it for a full refund." },
            { q: "Support availability?", a: "Our skincare experts are available 24/7 via email or chat to help you with your routine." }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-2 border-gold/10 rounded-[2.5rem] px-8 bg-white overflow-hidden elegant-shadow hover:border-gold/30 transition-all">
              <AccordionTrigger className="font-display text-2xl text-dark hover:no-underline py-8 font-bold text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="font-body text-dark/70 text-lg leading-relaxed pb-8 font-medium">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* STICKY CTA ON MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t-2 border-gold/10 md:hidden z-[60]">
        <Link href="/checkout">
          <button 
            className="gold-gradient text-white w-full h-16 rounded-full font-body font-black text-xl shadow-2xl shadow-gold/30" 
            data-testid="button-sticky-checkout"
          >
            Order Now - Rs. 3,500
          </button>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gold/10 text-center bg-cream relative z-10">
        <img src={logo} alt="Azzivone" className="h-16 mx-auto mb-10 opacity-70" />
        <div className="flex justify-center gap-10 mb-10">
          <span className="text-dark font-body font-bold hover:text-gold cursor-pointer">Privacy Policy</span>
          <span className="text-dark font-body font-bold hover:text-gold cursor-pointer">Terms of Service</span>
          <span className="text-dark font-body font-bold hover:text-gold cursor-pointer">Contact Us</span>
        </div>
        <p className="font-body text-dark/40 text-sm font-bold tracking-widest uppercase">&copy; 2026 Azzivone Skincare. Crafted for your radiance.</p>
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
      strokeWidth="2.5"
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
