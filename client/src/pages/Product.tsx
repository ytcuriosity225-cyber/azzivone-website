import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Star, ArrowRight, Play, ShoppingCart, Truck, Zap, ChevronRight, Heart, Sparkles as SparklesIcon, ChevronLeft, Clock, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Assets
import productHero from "@assets/Time_(1)_1768325370235.png";
import productDisplay from "@assets/2_1768298491725.png";
import productClean from "@assets/3_1768298491725.png";
import productBathroom from "@assets/4_1768298491727.png";
import productHand from "@assets/5_1768298491727.png";
import productTexture from "@assets/6_1768298491727.png";
import productLifestyle from "@assets/7_1768298491728.png";
import logo from "@assets/logo_1768257103773.png";

// Doctor Videos
import docVideo1 from "@assets/Create_a_realistic_15_second_video_of_a_Pakistani_female_derma_1768392208823.mp4";
import docVideo2 from "@assets/Create_a_realistic_15_second_video_of_a_Pakistani_female_derma_1768392697428.mp4";
import docVideo3 from "@assets/Create_a_realistic_15_second_video_of_a_Pakistani_female_derma_1768392697442.mp4";
import docVideo4 from "@assets/Create_a_realistic_15_second_video_of_a_Pakistani_female_derma_1768392697458.mp4";
import docVideo5 from "@assets/Create_a_realistic_15_second_video_of_a_Pakistani_female_derma_1768392697493.mp4";
import docVideo6 from "@assets/VID_20260114143253107_1768392697472.mp4";

const doctorVideos = [
  docVideo1,
  docVideo2,
  docVideo3,
  docVideo4,
  docVideo5,
  docVideo6,
];

const reviews = [
  { thumbnail: productDisplay },
  { thumbnail: productClean },
  { thumbnail: productBathroom },
  { thumbnail: productHand },
];

const whatsappScreenshots = [
  productTexture,
  productLifestyle,
  productHero,
  productDisplay,
  productClean,
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
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
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const [displayReviews, setDisplayReviews] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>({ title: "Azzivone Snail Mucin Serum" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, heroRes] = await Promise.all([
          fetch("/api/dashboard/reviews"),
          fetch("/api/dashboard/hero")
        ]);

        if (reviewsRes.ok) setDisplayReviews(await reviewsRes.json());
        if (heroRes.ok) setHeroData(await heroRes.json());
      } catch (err) {
        console.error("Failed to fetch product page data:", err);
      }
    };
    fetchData();
  }, []);

  const reviewsList = displayReviews.length > 0 ? displayReviews : reviews;
  
  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'reactions') {
      const element = document.getElementById('reactions-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  const scrollToDoctors = () => {
    const element = document.getElementById('doctors-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const productImages = [
    productHero,
    productDisplay,
    productClean,
    productBathroom,
    productHand,
    productTexture,
    productLifestyle,
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % productImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-body text-dark relative selection:bg-gold/10">
      <FloatingIcons />
      
      {/* Product Carousel Overlay */}
      <AnimatePresence>
        {isCarouselOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-xl px-4"
            onClick={() => setIsCarouselOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {productImages.map((img, idx) => (
                  <img key={idx} src={img} className="w-full h-full object-contain shrink-0" alt={`Product ${idx}`} />
                ))}
              </div>

              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-gold w-6' : 'bg-white/30'}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF9]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={logo} alt="Azzivone" className="h-12 md:h-16 cursor-pointer" />
          </Link>
          <Link href="/checkout">
            <button className="gold-gradient text-white px-6 py-2.5 rounded-[6px] font-body font-bold text-sm tracking-tight shadow-sm hover:shadow-lg transition-all active:scale-95 uppercase">
              Order Now
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl mb-16 px-4"
          >
            <div 
              onClick={() => setIsCarouselOpen(true)}
              className="relative group overflow-hidden rounded-2xl elegant-shadow border border-gold/10 cursor-pointer"
            >
              <img 
                src={productHero} 
                alt="Product" 
                className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="eager"
                width="1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-white font-bold uppercase tracking-widest text-xs">View Gallery</div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full gold-gradient flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.5)] border-4 border-white/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1.5" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="relative z-10 text-center max-w-4xl px-4">
            <div className="inline-flex items-center gap-4 mb-8 bg-dark border border-gold/30 px-6 py-3 rounded-full shadow-2xl">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gold/50 bg-dark overflow-hidden ring-4 ring-dark/50">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+300}&backgroundColor=000000`} 
                      className="w-full h-full object-cover grayscale brightness-110"
                      alt="User" 
                    />
                  </div>
                ))}
              </div>
              <div className="h-6 w-px bg-gold/20 mx-1" />
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-gold fill-gold" />)}
                </div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] leading-none mt-1">Elite Choice</span>
              </div>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-dark leading-[1.1] mb-8 font-medium">
              {heroData.title.includes("Snail Mucin") ? (
                <>Azzivone <span className="text-gold italic">Snail Mucin</span> Serum</>
              ) : heroData.title}
            </h1>
            
            <p className="text-lg md:text-xl text-dark/70 mb-10 leading-relaxed font-body">
             Glass-Glow Skin, Engineered for High-Performance Lives.

              Repair, hydration, and refinement — without slowing you down.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Link href="/checkout">
                <button className="gold-gradient text-white px-10 py-4 rounded-[6px] font-body font-bold text-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest min-w-[300px]">
                  Continue to Checkout <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              
              <div className="flex flex-wrap justify-center gap-6 text-xs text-dark/60 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-gold" /> Fast Shipping 48 hrs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reactions Section */}
      <section id="reactions-section" className="py-24 bg-[#FAFAF9] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-dark mb-4">Reaction from Customers</h2>
            <div className="w-12 h-1 gold-glaze-bar mx-auto rounded-full" />
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
            {reviewsList.map((video, index) => (
              <div key={index} className="min-w-[70vw] md:min-w-[320px] aspect-[9/16] bg-white rounded-[6px] overflow-hidden snap-center relative group elegant-shadow border border-gold/5">
                <img src={video.thumbnail || video.avatar} className="w-full h-full object-cover" alt="Review" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-24 bg-white px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAFAF9] p-10 rounded-[6px] border border-gold/5">
              <div className="w-10 h-10 bg-gold/10 text-gold rounded-[4px] flex items-center justify-center mb-6">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl mb-6 text-dark font-medium">The Problem</h3>
              <ul className="space-y-4 text-dark/70 font-body text-sm">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Persistent dryness</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Visible acne scars</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Expensive filler dependency</li>
              </ul>
            </div>

            <div className="bg-gold p-10 rounded-[6px] text-white transform md:-translate-y-4 shadow-xl">
              <div className="w-10 h-10 bg-white/20 text-white rounded-[4px] flex items-center justify-center mb-6">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <h3 className="font-display text-2xl mb-6 font-medium">The Agitation</h3>
              <p className="text-white/80 leading-relaxed font-body text-sm">
                Skin damage leads to premature aging. Your confidence shouldn't depend on filters. Every day without proper repair is a day your skin loses elasticity.
              </p>
            </div>

            <div className="bg-[#FAFAF9] p-10 rounded-[6px] border border-gold/5">
              <div className="w-10 h-10 bg-gold/10 text-gold rounded-[4px] flex items-center justify-center mb-6">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl mb-6 text-dark font-medium">The Solution</h3>
              <p className="text-dark/70 leading-relaxed font-body text-sm">
                Azzivone uses 96% Pure Snail Mucin to naturally stimulate collagen and heal the moisture barrier. It's a reset button for your skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DOC Reactions Section */}
      <section id="doctors-section" className="py-24 bg-[#FAFAF9] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-dark mb-4">What Doctors say?</h2>
            <div className="w-12 h-1 gold-glaze-bar mx-auto rounded-full" />
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth">
            {doctorVideos.map((video, index) => (
              <div key={index} className="min-w-[70vw] md:min-w-[320px] aspect-[9/16] bg-black rounded-[6px] overflow-hidden snap-center relative group elegant-shadow border border-gold/5">
                <video 
                  src={video} 
                  className="w-full h-full object-cover" 
                  preload="none"
                  onClick={(e) => e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()}
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center text-white shadow-xl">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl md:text-3xl text-dark">Screen shots of the customer chats</h3>
              <div className="w-12 h-0.5 bg-gold/30 mx-auto mt-3" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
              {whatsappScreenshots.map((img, index) => (
                <div key={index} className="min-w-[280px] md:min-w-[320px] bg-white p-2 rounded-[6px] elegant-shadow border border-gold/5 snap-center">
                  <img src={img} className="w-full aspect-[3/4] object-cover rounded-[4px]" alt="Chat" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Delivery Gallery */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-dark">Real Deliveries</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[productDisplay, productClean, productBathroom, productLifestyle].map((url, i) => (
            <div key={i} className="aspect-square rounded-[6px] overflow-hidden elegant-shadow border border-gold/5">
              <img src={url} alt="Delivery" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-3xl md:text-5xl text-dark mb-16 text-center">Common Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "Who is this for?", a: "Azzivone is formulated for all skin types, especially those with dry, sensitive, or acne-prone skin looking to repair their moisture barrier." },
            { q: "Is it beginner-friendly?", a: "Absolutely. It fits seamlessly into any routine—just apply before your moisturizer. No complex layering required." },
            { q: "Refund / guarantee?", a: "We offer a 30-day \"Empty Bottle\" guarantee. If you don't see results, just return it for a full refund." }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-gold/10 rounded-[6px] px-6 bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="font-display text-xl text-dark hover:no-underline py-6 text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="font-body text-dark/60 text-sm leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <button 
          onClick={scrollToDoctors}
          className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-base shadow-2xl active:scale-95 transition-transform uppercase tracking-widest"
        >
          Doctors Recommendations
        </button>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gold/10 text-center relative z-10 px-6">
        <h2 className="font-display text-2xl text-dark mb-6">Azzivone</h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-body text-[10px] text-dark/30 uppercase tracking-[0.3em] mb-8">
          <span>Premium Skincare</span>
          <span>US Shipping</span>
          <span>Contact Us</span>
        </div>
        <p className="font-body text-[8px] text-dark/20 tracking-[0.4em] uppercase">© 2026 Azzivone. All rights reserved.</p>
      </footer>
    </div>
  );
}
