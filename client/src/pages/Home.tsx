import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { CheckCircle, Droplets, Sparkles, Shield, Clock, Star, ChevronRight, ChevronLeft, Award, Leaf, Heart, ShoppingCart as ShoppingCartIcon, Play } from "lucide-react";
import heroVideo from "@assets/HERO_VIDEO_1768257063489.mp4";
import logo from "@assets/logo_1768257103773.png";
import product1 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.14_PM_1768257023864.jpeg";
import product2 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.15_PM_1768257023866.jpeg";
import product3 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.16_PM_(1)_1768257023867.jpeg";
import product4 from "@assets/4_1768257083474.png";
import product5 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.15_PM_(1)_1768257023865.jpeg";

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
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: icon.delay,
              ease: "linear"
            }}
            className="absolute"
          >
            {icon.type === 'heart' ? (
              <Heart className="w-6 h-6 text-gold fill-gold" />
            ) : (
              <ShoppingCartIcon className="w-6 h-6 text-gold" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: "30-Second Ritual",
      description: "Quick morning application fits any busy schedule",
      image: product1
    },
    {
      icon: Droplets,
      title: "Deep Hydration",
      description: "96% pure snail mucin locks in moisture all day",
      image: product2
    },
    {
      icon: Sparkles,
      title: "Natural Glow",
      description: "Reveals radiant, glass-like skin texture",
      image: product3
    }
  ];

  const products = [
    {
      id: 1,
      name: "Snail Mucin Serum",
      price: "3,500",
      image: product4,
      bullets: [
        "96% Pure Snail Mucin",
        "Deep 24h Hydration",
        "Repairs Acne Scars",
        "Cruelty-Free"
      ]
    },
    {
      id: 2,
      name: "Coming Soon!",
      price: "9,999",
      image: product5,
      bullets: [
        "Calms Redness",
        "Barrier Repair",
        "Vitamin B5 Rich",
        "All-Night Glow"
      ]
    }
  ];

  const reviews = [
    { type: 'video', thumbnail: product1 },
    { type: 'video', thumbnail: product2 },
    { type: 'video', thumbnail: product3 },
    { type: 'video', thumbnail: product4 },
  ];

  const whatsappScreenshots = [
    product1, product2, product3, product4, product5
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] overflow-x-hidden relative selection:bg-gold/10">
      <FloatingIcons />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF9]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Azzivone" className="h-12 md:h-16" />
          <Link href="/product">
            <button className="gold-gradient text-white px-6 py-2.5 rounded-[6px] font-body font-bold text-sm tracking-tight hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest">
              Order Now
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-black">
        <video 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onClick={(e) => e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-video-overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="font-display text-4xl md:text-7xl text-white leading-[1.1] mb-6 font-medium drop-shadow-2xl"
          >
            Glass-Glow Skin, engineered for people who don’t slow down
          </motion.h1>
          <motion.div variants={fadeInUp}>
            <Link href="/product">
              <button className="gold-gradient text-white px-10 py-4 rounded-[6px] font-body font-bold text-lg hover:shadow-xl transition-all active:scale-95 uppercase tracking-widest">
                View product
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronLeft className="-rotate-90 w-5 h-5 text-white/30" />
        </motion.div>
      </section>

      {/* Product Catalogue */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-dark mb-4">The Catalogue</h2>
            <div className="w-12 h-1 gold-glaze-bar rounded-full" />
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {products.map((p, idx) => (
              <motion.div 
                key={p.id}
                variants={{
                  hidden: { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { 
                      duration: 0.8, 
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: idx * 0.2 
                    } 
                  }
                }}
                className="group bg-[#FAFAF9] p-8 rounded-[6px] flex gap-10 items-center card-hover border border-transparent hover:border-gold/5"
              >
                <div className="w-1/2 aspect-[4/5] rounded-[6px] overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} loading="lazy" width="600" />
                </div>
                <div className="w-1/2">
                  <h3 className="font-display text-3xl text-dark mb-4">{p.name}</h3>
                  <ul className="space-y-3 mb-8">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-dark/70 font-body text-sm">
                        <CheckCircle className="w-4 h-4 text-gold" /> {b}
                      </li>
                    ))}
                  </ul>
                  <p className="font-display text-2xl text-gold mb-6">Rs. {p.price}</p>
                  <Link href="/product">
                    <button className="w-full gold-gradient text-white py-3 rounded-[6px] font-body text-sm font-bold hover:shadow-lg transition-all uppercase tracking-widest">View Details</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4">
            {products.map((p) => (
              <div key={p.id} className="min-w-[85vw] snap-center bg-[#FAFAF9] p-6 rounded-[6px]">
                <img src={p.image} className="w-full aspect-[4/5] object-cover rounded-[6px] mb-6" alt={p.name} />
                <h3 className="font-display text-2xl text-dark mb-4">{p.name}</h3>
                <p className="font-display text-xl text-gold mb-6">Rs. {p.price}</p>
                <Link href="/product?section=reactions">
                  <button className="w-full gold-gradient text-white py-3 rounded-[6px] font-body text-sm font-bold uppercase tracking-widest">Learn More</button>
                </Link>
              </div>
            ))}
          </div>
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
            {reviews.map((video, index) => (
              <div key={index} className="min-w-[70vw] md:min-w-[320px] aspect-[9/16] bg-white rounded-[6px] overflow-hidden snap-center relative group elegant-shadow border border-gold/5">
                <img src={video.thumbnail} className="w-full h-full object-cover" alt="Review" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
            {whatsappScreenshots.map((img, index) => (
              <div key={index} className="bg-white p-2 rounded-[6px] elegant-shadow border border-gold/5">
                <img src={img} className="w-full aspect-[3/4] object-cover rounded-[4px]" alt="Chat" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science & Benefits */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((b, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="w-12 h-12 bg-gold/10 rounded-[6px] flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <b.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl text-dark mb-4">{b.title}</h3>
                <p className="font-body text-dark/70 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scarcity & Final CTA */}
      <section className="py-32 bg-[#FAFAF9] relative z-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-6xl text-dark mb-8 leading-tight">
            Elevate your skin to <span className="text-gold">Glass-Status</span>
          </h2>
          <p className="font-body text-dark/60 text-lg mb-12">
            Experience the 96% pure difference. <br />
            <span className="text-gold font-medium">Only 300 bottles produced monthly.</span>
          </p>
          <Link href="/product">
            <button className="gold-gradient text-white px-12 py-4 rounded-[6px] font-body font-bold text-lg hover:shadow-xl transition-all uppercase tracking-widest">
              Order Azzivone Serum
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gold/10 text-center relative z-10 px-6">
        <h2 className="font-display text-2xl text-dark mb-6">Azzivone</h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-body text-xs text-dark/40 uppercase tracking-widest mb-8">
          <span>Premium Skincare</span>
          <span>US Shipping</span>
          <span>Contact Us</span>
        </div>
        <p className="font-body text-[10px] text-dark/30 tracking-[0.3em] uppercase">© 2026 Azzivone. All rights reserved.</p>
      </footer>

      {/* Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Link href="/product?section=reactions">
          <button className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-base shadow-2xl active:scale-95 transition-transform uppercase tracking-widest">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}
