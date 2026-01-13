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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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
    },
    {
      icon: Shield,
      title: "Skin Repair",
      description: "Heals scars, acne marks & fine lines naturally",
      image: product4
    }
  ];

  const testimonials = [
    {
      name: "Ayesha K.",
      text: "Started using 2 weeks ago. My skin has never looked this good! The glow is real ✨",
      rating: 5
    },
    {
      name: "Sara M.",
      text: "Finally found something that actually works. My dark spots are fading so fast!",
      rating: 5
    },
    {
      name: "Fatima R.",
      text: "Best investment for my skin. Even my husband noticed the difference! 💕",
      rating: 5
    }
  ];

  const comparisonData = [
    { feature: "Snail Mucin Concentration", ours: "96% Pure", market: "30-50% diluted" },
    { feature: "Added Fillers", ours: "Zero fillers", market: "Water & alcohols" },
    { feature: "Absorption Time", ours: "Under 30 sec", market: "2-3 minutes" },
    { feature: "Dermatologist Tested", ours: "Yes ✓", market: "Rarely" },
    { feature: "Results Timeline", ours: "7-14 days", market: "4-6 weeks" }
  ];

  const reviews = [
    { type: 'video', url: '#', thumbnail: product1 },
    { type: 'video', url: '#', thumbnail: product2 },
    { type: 'video', url: '#', thumbnail: product3 },
    { type: 'video', url: '#', thumbnail: product4 },
  ];

  const whatsappScreenshots = [
    product1, product2, product3, product4, product5
  ];

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden relative">
      <FloatingIcons />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Azzivone" className="h-16 md:h-24 transform hover:scale-105 transition-transform" data-testid="logo-nav" />
          <Link href="/product">
            <button 
              className="bg-gold text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-body font-bold text-sm md:text-base tracking-wide hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-order-nav"
            >
              Order Now
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-hero"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-video-overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p 
            variants={fadeInUp}
            className="font-body text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
          >
            Premium Skincare
          </motion.p>
          <motion.h1 
            variants={fadeInUp}
            className="font-display text-4xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
          >
            The 30-Second Morning Ritual for{" "}
            <span className="italic text-gold">Flawless Skin</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="font-body text-white text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            Discover the power of 96% pure Snail Mucin. Transform your skin with intense hydration and natural glow.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/product">
              <button 
                className="gold-gradient text-white px-10 md:px-14 py-5 rounded-full font-body font-black text-lg md:text-2xl tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/30"
                data-testid="button-order-hero"
              >
                View Product 
                <ChevronRight className="inline-block ml-2 w-6 h-6 stroke-[3px]" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Benefits Horizontal Slider */}
      <section className="py-24 md:py-32 bg-cream overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-dark font-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-24"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm md:text-lg mb-6">
              Why It Works
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-7xl mb-8">
              Why Busy People <span className="italic text-gold">Love It</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-32 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="relative group/slider -mx-4 md:-mx-6 px-4 md:px-6">
            <motion.div 
              className="flex gap-6 md:gap-10 overflow-x-auto pb-16 snap-x snap-mandatory no-scrollbar scroll-smooth touch-pan-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="min-w-[85vw] md:min-w-[450px] snap-center group relative bg-white rounded-[3rem] overflow-hidden elegant-shadow border-4 border-white transition-all duration-500 hover:scale-[1.02]"
                  data-testid={`card-benefit-${index}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gold/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <benefit.icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide">{benefit.title}</h3>
                    </div>
                    <p className="font-body text-white/90 text-lg md:text-xl font-medium leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-24"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm md:text-lg mb-6">
              Experience the Magic
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-7xl text-dark mb-8">
              Video <span className="italic text-gold">Reviews</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-32 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-16 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 md:-mx-6 px-4 md:px-6 touch-pan-x cursor-grab active:cursor-grabbing">
            {reviews.map((video, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[80vw] md:min-w-[380px] aspect-[9/16] bg-cream rounded-[3rem] overflow-hidden snap-center relative group elegant-shadow border-4 border-gold/10"
              >
                <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Video Review" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 flex items-center justify-center text-white backdrop-blur-sm transform scale-90 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="w-10 h-10 md:w-12 md:h-12 fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-8 right-8 text-white drop-shadow-xl">
                  <p className="font-display text-2xl md:text-3xl font-bold italic mb-2">"Absolute Game Changer ✨"</p>
                  <div className="flex text-gold gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-cream to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gold/5 rounded-[3rem] -rotate-3" />
              <img 
                src={product5} 
                alt="Snail Mucin Serum" 
                className="relative rounded-[3rem] elegant-shadow float-animation w-full border-4 border-white"
                data-testid="img-product-showcase"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-gold uppercase tracking-[0.25em] text-sm md:text-lg mb-6">
                The Formula
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-dark mb-10 font-black">
                96% Pure Snail Mucin <span className="italic text-gold">Perfection</span>
              </h2>
              <p className="font-body text-dark text-lg md:text-2xl leading-relaxed mb-12 font-medium">
                Our serum harnesses the regenerative power of snail secretion filtrate, 
                naturally rich in hyaluronic acid, glycoprotein enzymes, and copper peptides. 
                Each drop delivers intense hydration while stimulating collagen production.
              </p>
              
              <div className="space-y-6 mb-16">
                {[
                  "Intense 24-hour hydration",
                  "Reduces fine lines & wrinkles",
                  "Fades acne scars & dark spots",
                  "Strengthens skin barrier",
                  "Dermatologist approved"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 stroke-[3px]" />
                    <span className="font-body text-lg md:text-xl text-dark font-black tracking-tight">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/product">
                <button 
                  className="w-full md:w-auto bg-gold text-white px-10 py-5 rounded-full font-body font-black text-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-gold/30 flex items-center justify-center gap-3"
                  data-testid="button-order-showcase"
                >
                  Get Yours Today
                  <ChevronRight className="w-6 h-6 stroke-[3px]" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Proof Section */}
      <section className="py-24 md:py-32 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-dark font-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-24"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm md:text-lg mb-6">
              Community Love
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-7xl mb-8">
              Real <span className="italic text-gold">Conversations</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-32 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {whatsappScreenshots.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] overflow-hidden elegant-shadow p-3 border-4 border-white transform hover:-translate-y-2 transition-transform duration-300"
              >
                <img 
                  src={img} 
                  className="w-full h-auto rounded-[2rem]" 
                  alt="WhatsApp Proof" 
                  data-testid={`whatsapp-proof-${index}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-gold/10 text-center bg-cream relative z-10">
        <img src={logo} alt="Azzivone" className="h-16 mx-auto mb-10 opacity-70" />
        <p className="font-body text-dark font-bold text-lg mb-4">Azzivone Skincare Elite</p>
        <p className="font-body text-dark/40 text-sm font-bold tracking-widest uppercase">&copy; 2026 Azzivone Skincare. Crafted for your radiance.</p>
      </footer>
    </div>
  );
}
