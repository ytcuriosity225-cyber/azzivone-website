import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowLeft, Shield, Truck, CheckCircle, Package, CreditCard, 
  MapPin, Phone, User, Mail, Heart, ShoppingCart, 
  Wallet, Building2, Smartphone, Receipt, Ticket, LogIn
} from "lucide-react";
import logo from "@assets/logo_1768257103773.png";
import product from "@assets/4_1768257083474.png";

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
              <ShoppingCart className="w-6 h-6 text-gold" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    coupon: ""
  });

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const pricePerUnit = 3500;
  const total = quantity * pricePerUnit;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully! (This is a prototype)");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const paymentOptions = [
    { id: "cod", name: "Cash on Delivery", icon: Package, desc: "Pay at your doorstep" },
    { id: "bank", name: "Bank Transfer", icon: Building2, desc: "Direct bank deposit" },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone, desc: "Instant mobile payment" },
    { id: "easypaisa", name: "EasyPaisa", icon: Wallet, desc: "Instant mobile payment" },
    { id: "sadapay", name: "SadaPay", icon: Receipt, desc: "Quick card/app payment" },
    { id: "nayapay", name: "NayaPay", icon: Receipt, desc: "Quick card/app payment" },
    { id: "atm", name: "ATM/Debit Card", icon: CreditCard, desc: "All local cards supported" }
  ];

  return (
    <div className="min-h-screen bg-cream relative">
      <FloatingIcons />
      {/* Header */}
      <header className="bg-cream/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-dark font-bold hover:text-gold transition-colors font-body" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
              Back to Store
            </button>
          </Link>
          <img src={logo} alt="Azzivone" className="h-16 md:h-20" data-testid="logo-checkout" />
          <div className="flex items-center gap-4">
            <button className="p-2 text-dark hover:text-gold transition-colors relative">
              <Heart className="w-8 h-8 fill-gold text-gold" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">2</span>
            </button>
            <button className="p-2 text-dark hover:text-gold transition-colors relative">
              <ShoppingCart className="w-8 h-8 text-gold" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">{quantity}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Order Form */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <h1 className="font-display text-4xl md:text-6xl text-dark mb-4 font-black">
              Complete Your <span className="italic text-gold">Order</span>
            </h1>
            
            {/* Login Options */}
            <div className="bg-white rounded-[2rem] p-8 border-2 border-gold/5 elegant-shadow mb-8 mt-6">
              <h3 className="font-display text-2xl text-dark mb-6 flex items-center gap-2 font-bold">
                <LogIn className="w-6 h-6 text-gold" />
                Quick Login
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gold/10 hover:bg-gold/5 transition-all font-body text-base font-bold text-dark">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gold/10 hover:bg-gold/5 transition-all font-body text-base font-bold text-dark">
                  <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.011 20.29h-.01a7.66 7.66 0 0 1-3.905-1.071l-.28-.166-2.906.762.775-2.831-.183-.291A7.653 7.653 0 0 1 4.35 12.01c0-4.225 3.44-7.665 7.667-7.665 2.047 0 3.972.798 5.42 2.247a7.618 7.618 0 0 1 2.245 5.42c-.002 4.226-3.442 7.666-7.669 7.666zm8.845-8.281c0-4.885-3.978-8.863-8.864-8.863-2.366 0-4.59.923-6.264 2.598a8.816 8.816 0 0 0-2.597 6.265c0 2.246.85 4.39 2.392 6.037l-1.535 5.607 5.738-1.505a8.824 8.824 0 0 0 4.27 1.101h.01c4.884 0 8.862-3.979 8.863-8.864z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="bg-white rounded-[2rem] p-8 border-2 border-gold/5 elegant-shadow">
                <h3 className="font-display text-2xl text-dark mb-8 flex items-center gap-3 font-bold">
                  <User className="w-6 h-6 text-gold" />
                  Personal Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="font-body text-sm text-dark font-black mb-2.5 block uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gold/10 bg-cream/30 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-body text-lg font-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-sm text-dark font-black mb-2.5 block uppercase tracking-wider">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="03XX-XXXXXXX"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gold/10 bg-cream/30 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-body text-lg font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-sm text-dark font-black mb-2.5 block uppercase tracking-wider">Email (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gold/10 bg-cream/30 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-body text-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-[2rem] p-8 border-2 border-gold/5 elegant-shadow">
                <h3 className="font-display text-2xl text-dark mb-8 flex items-center gap-3 font-bold">
                  <MapPin className="w-6 h-6 text-gold" />
                  Delivery Address
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="font-body text-sm text-dark font-black mb-2.5 block uppercase tracking-wider">Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="House/Flat No., Street, Area, Landmark"
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gold/10 bg-cream/30 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-body text-lg font-bold resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="font-body text-sm text-dark font-black mb-2.5 block uppercase tracking-wider">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gold/10 bg-cream/30 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-body text-lg font-bold appearance-none cursor-pointer"
                    >
                      <option value="">Select your city</option>
                      <option value="karachi">Karachi</option>
                      <option value="lahore">Lahore</option>
                      <option value="islamabad">Islamabad</option>
                      <option value="rawalpindi">Rawalpindi</option>
                      <option value="faisalabad">Faisalabad</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="bg-white rounded-[2rem] p-8 border-2 border-gold/5 elegant-shadow">
                <h3 className="font-display text-2xl text-dark mb-8 flex items-center gap-3 font-bold">
                  <CreditCard className="w-6 h-6 text-gold" />
                  Payment Method
                </h3>
                
                <div className="space-y-4">
                  {paymentOptions.map((option) => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-5 p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all ${
                        paymentMethod === option.id ? 'border-gold bg-gold/5 shadow-inner' : 'border-gold/10 hover:border-gold/30'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value={option.id} 
                        checked={paymentMethod === option.id}
                        onChange={() => setPaymentMethod(option.id)}
                        className="hidden"
                      />
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        paymentMethod === option.id ? 'bg-gold text-white shadow-xl shadow-gold/20' : 'bg-gold/10 text-gold'
                      }`}>
                        <option.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body font-black text-dark text-lg">{option.name}</p>
                        <p className="font-body text-sm text-dark/60 font-medium">{option.desc}</p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all ${
                        paymentMethod === option.id ? 'border-gold bg-gold' : 'border-gold/20'
                      }`}>
                        {paymentMethod === option.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="lg:hidden w-full gold-gradient text-white py-6 rounded-full font-body font-black text-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-gold/40"
              >
                Place Order — Rs. {total.toLocaleString()}
              </button>
            </form>
          </motion.div>

          {/* Order Summary & Favorites */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Cart Summary */}
              <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gold/5 elegant-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-16 -translate-y-16" />
                <h3 className="font-display text-3xl text-dark mb-8 flex items-center justify-between font-black relative z-10">
                  <span>Order Summary</span>
                  <span className="text-sm font-body text-gold uppercase tracking-widest bg-gold/5 px-3 py-1 rounded-full">{quantity} Items</span>
                </h3>
                
                <div className="flex gap-6 pb-8 border-b-2 border-gold/10 relative z-10">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden bg-cream flex-shrink-0 border-2 border-gold/5 shadow-md">
                    <img src={product} alt="Snail Mucin Serum" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-display text-2xl text-dark font-bold leading-tight">Snail Mucin Serum</h4>
                      <p className="font-body text-sm text-dark/50 font-black uppercase tracking-wider mt-1">96% Pure • 30ml</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-cream/50 rounded-xl p-1 border border-gold/10">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gold font-black hover:bg-gold hover:text-white transition-colors">−</button>
                        <span className="font-body font-black text-dark text-lg px-4">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gold font-black hover:bg-gold hover:text-white transition-colors">+</button>
                      </div>
                      <div className="text-right flex-1">
                        <p className="font-display text-2xl text-gold font-black">Rs. {pricePerUnit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="py-8 relative z-10">
                  <label className="font-body text-xs text-dark font-black mb-2.5 block uppercase tracking-[0.15em]">Have a coupon code?</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                      <input 
                        type="text" 
                        name="coupon"
                        value={formData.coupon}
                        onChange={handleInputChange}
                        placeholder="Enter code" 
                        className="w-full pl-12 pr-5 py-3.5 rounded-2xl border-2 border-gold/10 bg-cream/30 outline-none font-body text-base font-bold"
                      />
                    </div>
                    <button className="px-8 py-3.5 bg-dark text-white rounded-2xl font-body font-black text-sm hover:bg-black transition-all hover:scale-105 shadow-lg">Apply</button>
                  </div>
                </div>

                <div className="pt-8 border-t-2 border-gold/10 space-y-4 relative z-10">
                  <div className="flex justify-between text-lg font-body font-bold">
                    <span className="text-dark/40">Subtotal</span>
                    <span className="text-dark tracking-tight">Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="font-display text-2xl text-dark font-black tracking-tight">Total Payment</span>
                    <span className="font-display text-4xl text-gold font-black drop-shadow-sm">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={handleSubmit} className="hidden lg:block w-full gold-gradient text-white py-6 rounded-full font-body font-black text-2xl mt-10 shadow-2xl shadow-gold/40 hover:scale-[1.02] transition-transform">
                  Place Order
                </button>
              </div>

              {/* Favourite Items */}
              <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gold/5 elegant-shadow">
                <h3 className="font-display text-2xl text-dark mb-6 flex items-center gap-3 font-bold">
                  <Heart className="w-7 h-7 text-gold fill-gold" />
                  Your Favourites
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gold/5 bg-gold/5 hover:bg-gold/10 transition-colors">
                    <div className="w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                      <img src={product} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-base font-black text-dark">Skin Repair Balm</p>
                      <p className="font-display text-xl text-gold font-black">Rs. 2,800</p>
                    </div>
                    <button className="w-12 h-12 rounded-xl bg-gold text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-gold/20">
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Shield, text: "Secure Checkout" },
                  { icon: Truck, text: "Free Delivery" },
                  { icon: Package, text: "COD Available" }
                ].map((badge, i) => (
                  <div key={i} className="bg-white rounded-[1.5rem] p-5 border-2 border-gold/5 text-center elegant-shadow group hover:border-gold/30 transition-all">
                    <badge.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-body text-xs text-dark font-black uppercase tracking-wider">{badge.text}</p>
                  </div>
                ))}
              </div>

              {/* Guarantee */}
              <div className="mt-8 p-6 bg-gold/5 rounded-[2rem] border-2 border-gold/10 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform" />
                <p className="font-body text-base text-dark relative z-10 leading-relaxed font-medium">
                  <span className="font-black text-gold text-lg block mb-1">100% Satisfaction Guarantee</span>
                  Not satisfied? Contact us within 7 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-cream border-t border-gold/10 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src={logo} alt="Azzivone" className="h-10 mx-auto mb-6 opacity-70" />
          <p className="font-body text-dark font-black text-lg mb-2 tracking-tight">Azzivone Skincare Elite</p>
          <p className="font-body text-dark/40 text-xs font-black tracking-[0.2em] uppercase">
            © 2026 Azzivone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
