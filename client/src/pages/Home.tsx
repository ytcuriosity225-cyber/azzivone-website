import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Droplets, Sparkles, Shield, Clock, Star, ChevronRight, Award, Leaf, Heart } from "lucide-react";
import heroVideo from "@assets/HERO_VIDEO_1768257063489.mp4";
import logo from "@assets/logo_1768257103773.png";
import product1 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.14_PM_1768257023864.jpeg";
import product2 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.15_PM_1768257023866.jpeg";
import product3 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.16_PM_(1)_1768257023867.jpeg";
import product4 from "@assets/4_1768257083474.png";
import product5 from "@assets/WhatsApp_Image_2026-01-12_at_2.29.15_PM_(1)_1768257023865.jpeg";

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
    },
    {
      name: "Hina A.",
      text: "I was skeptical but WOW! My acne scars are almost invisible now.",
      rating: 5
    },
    {
      name: "Zainab N.",
      text: "Using it for a month. People keep asking what's my secret! 🌟",
      rating: 5
    },
    {
      name: "Maryam S.",
      text: "The texture is so luxurious. Absorbs instantly, no sticky feeling!",
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
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Azzivone" className="h-8 md:h-10" data-testid="logo-nav" />
          <Link href="/checkout">
            <button 
              className="bg-gold text-white px-6 py-2.5 rounded-full font-body font-semibold text-sm tracking-wide hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
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
            className="font-body text-gold uppercase tracking-[0.3em] text-sm mb-6"
          >
            Premium Skincare
          </motion.p>
          <motion.h1 
            variants={fadeInUp}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8"
          >
            The 30-Second Morning Ritual for{" "}
            <span className="italic text-gold">Flawless Skin</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover the power of 96% pure Snail Mucin. Transform your skin with intense hydration and natural glow.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/checkout">
              <button 
                className="gold-gradient text-white px-10 py-4 rounded-full font-body font-bold text-lg tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/30"
                data-testid="button-order-hero"
              >
                Order Now — Rs. 3,500
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
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
      <section className="py-24 md:py-32 px-6 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-4">
              Why It Works
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-5xl text-dark mb-6">
              Why Busy People <span className="italic text-gold">Love It</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>

          <div className="relative">
            <motion.div 
              className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="min-w-[300px] md:min-w-[400px] snap-center group relative bg-white rounded-2xl overflow-hidden card-hover elegant-shadow"
                  data-testid={`card-benefit-${index}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gold/30 backdrop-blur-sm flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-display text-xl md:text-2xl text-white">{benefit.title}</h3>
                    </div>
                    <p className="font-body text-white/90 text-sm md:text-base">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-4">
              Experience the Magic
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-5xl text-dark mb-6">
              Video <span className="italic text-gold">Reviews</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {reviews.map((video, index) => (
              <div 
                key={index} 
                className="min-w-[260px] md:min-w-[320px] aspect-[9/16] bg-cream rounded-2xl overflow-hidden snap-center relative group elegant-shadow"
              >
                <img src={video.thumbnail} className="w-full h-full object-cover" alt="Video Review" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center text-white backdrop-blur-sm transform group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gold/5 rounded-3xl -rotate-3" />
              <img 
                src={product5} 
                alt="Snail Mucin Serum" 
                className="relative rounded-2xl elegant-shadow float-animation"
                data-testid="img-product-showcase"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-4">
                The Formula
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-dark mb-6">
                96% Pure Snail Mucin <span className="italic">Perfection</span>
              </h2>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8">
                Our serum harnesses the regenerative power of snail secretion filtrate, 
                naturally rich in hyaluronic acid, glycoprotein enzymes, and copper peptides. 
                Each drop delivers intense hydration while stimulating collagen production.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Intense 24-hour hydration",
                  "Reduces fine lines & wrinkles",
                  "Fades acne scars & dark spots",
                  "Strengthens skin barrier",
                  "Dermatologist approved"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="font-body text-dark">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/checkout">
                <button 
                  className="bg-gold text-white px-8 py-4 rounded-full font-body font-bold hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  data-testid="button-order-showcase"
                >
                  Get Yours Today
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Proof Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-4">
              Community Love
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-5xl text-dark mb-6">
              Real <span className="italic text-gold">Conversations</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatsappScreenshots.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden elegant-shadow p-2"
              >
                <img 
                  src={img} 
                  className="w-full h-auto rounded-xl" 
                  alt="WhatsApp Proof" 
                  data-testid={`whatsapp-proof-${index}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Framing Section */}
      <section className="py-24 bg-gradient-to-b from-white to-cream">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-4">
              The Elite Difference
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-5xl text-dark mb-6">
              Why <span className="italic text-gold">Rs. 3,500</span>?
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              When you invest in quality, you invest in results. Here's what sets us apart from the market.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl overflow-hidden elegant-shadow"
          >
            <div className="grid grid-cols-3 bg-gold/10 p-4 md:p-6">
              <div className="font-body font-semibold text-dark text-sm md:text-base">Feature</div>
              <div className="font-body font-semibold text-gold text-center text-sm md:text-base flex items-center justify-center gap-2">
                <Award className="w-4 h-4" /> Azzivone
              </div>
              <div className="font-body font-semibold text-muted-foreground text-center text-sm md:text-base">Market Standard</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 p-4 md:p-6 ${index !== comparisonData.length - 1 ? 'border-b border-gold/10' : ''}`}
                data-testid={`row-comparison-${index}`}
              >
                <div className="font-body text-dark text-sm md:text-base">{row.feature}</div>
                <div className="font-body text-gold font-semibold text-center text-sm md:text-base">{row.ours}</div>
                <div className="font-body text-muted-foreground text-center text-sm md:text-base">{row.market}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Leaf, title: "100% Natural", desc: "No parabens, no sulfates" },
              { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals" },
              { icon: Shield, title: "Guaranteed Results", desc: "7-day visible improvement" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gold/10">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-dark">{item.title}</h4>
                  <p className="font-body text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <p className="font-body text-gold uppercase tracking-[0.25em] text-sm mb-6">
            Limited Time Offer
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-8">
            Transform Your Skin <span className="italic text-gold">Today</span>
          </h2>
          <p className="font-body text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join thousands of women who have discovered the secret to flawless, glowing skin. 
            Your transformation starts with one simple decision.
          </p>
          
          <Link href="/checkout">
            <button 
              className="gold-gradient text-white px-12 py-5 rounded-full font-body font-bold text-xl tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl"
              data-testid="button-order-final"
            >
              Order Now — Rs. 3,500
              <ChevronRight className="inline-block ml-2 w-6 h-6" />
            </button>
          </Link>
          
          <p className="font-body text-white/50 text-sm mt-6">
            Free delivery across Pakistan • Cash on Delivery available
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-cream border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={logo} alt="Azzivone" className="h-8" data-testid="logo-footer" />
            <p className="font-body text-muted-foreground text-sm">
              © 2026 Azzivone. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-muted-foreground text-sm hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="font-body text-muted-foreground text-sm hover:text-gold transition-colors">Terms</a>
              <a href="#" className="font-body text-muted-foreground text-sm hover:text-gold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
