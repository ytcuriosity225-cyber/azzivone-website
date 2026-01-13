import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowLeft, Shield, Truck, CheckCircle, Package, CreditCard, 
  MapPin, Phone, User, Mail, Heart, ShoppingCart, 
  Wallet, Building2, Smartphone, Receipt, Ticket, LogIn
} from "lucide-react";
import logo from "@assets/logo_1768257103773.png";
import product from "@assets/4_1768257083474.png";

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
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-cream/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
              Back to Store
            </button>
          </Link>
          <img src={logo} alt="Azzivone" className="h-8" data-testid="logo-checkout" />
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-gold transition-colors relative">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
            <button className="p-2 text-muted-foreground hover:text-gold transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{quantity}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Order Form */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <h1 className="font-display text-3xl md:text-4xl text-dark mb-2">
              Complete Your <span className="italic text-gold">Order</span>
            </h1>
            
            {/* Login Options */}
            <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow mb-8 mt-6">
              <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                <LogIn className="w-5 h-5 text-gold" />
                Quick Login
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gold/20 hover:bg-gold/5 transition-all font-body text-sm text-dark">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gold/20 hover:bg-gold/5 transition-all font-body text-sm text-dark">
                  <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.011 20.29h-.01a7.66 7.66 0 0 1-3.905-1.071l-.28-.166-2.906.762.775-2.831-.183-.291A7.653 7.653 0 0 1 4.35 12.01c0-4.225 3.44-7.665 7.667-7.665 2.047 0 3.972.798 5.42 2.247a7.618 7.618 0 0 1 2.245 5.42c-.002 4.226-3.442 7.666-7.669 7.666zm8.845-8.281c0-4.885-3.978-8.863-8.864-8.863-2.366 0-4.59.923-6.264 2.598a8.816 8.816 0 0 0-2.597 6.265c0 2.246.85 4.39 2.392 6.037l-1.535 5.607 5.738-1.505a8.824 8.824 0 0 0 4.27 1.101h.01c4.884 0 8.862-3.979 8.863-8.864z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-sm text-dark mb-1.5 block">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-dark mb-1.5 block">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="03XX-XXXXXXX"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-sm text-dark mb-1.5 block">Email (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Delivery Address
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-sm text-dark mb-1.5 block">Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="House/Flat No., Street, Area, Landmark"
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="font-body text-sm text-dark mb-1.5 block">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body"
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
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Payment Method
                </h3>
                
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === option.id ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paymentMethod === option.id ? 'bg-gold text-white' : 'bg-gold/10 text-gold'
                      }`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body font-semibold text-dark text-sm">{option.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{option.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === option.id ? 'border-gold bg-gold' : 'border-gold/30'
                      }`}>
                        {paymentMethod === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="lg:hidden w-full gold-gradient text-white py-4 rounded-xl font-body font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                Place Order — Rs. {total.toLocaleString()}
              </button>
            </form>
          </motion.div>

          {/* Order Summary & Favorites */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Cart Summary */}
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-6 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-sm font-body text-muted-foreground">{quantity} Items</span>
                </h3>
                
                <div className="flex gap-4 pb-6 border-b border-gold/10">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                    <img src={product} alt="Snail Mucin Serum" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-dark">Snail Mucin Serum</h4>
                    <p className="font-body text-xs text-muted-foreground mb-2">96% Pure • 30ml</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm">−</button>
                      <span className="font-body font-semibold text-dark text-sm">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg text-gold">Rs. {pricePerUnit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="py-4">
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">Have a coupon code?</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input 
                        type="text" 
                        name="coupon"
                        value={formData.coupon}
                        onChange={handleInputChange}
                        placeholder="Enter code" 
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-gold/20 bg-cream/30 outline-none font-body text-sm"
                      />
                    </div>
                    <button className="px-4 py-2 bg-dark text-white rounded-xl font-body text-sm hover:bg-black transition-colors">Apply</button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/10 space-y-2">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-dark">Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-display text-xl text-dark">Total</span>
                    <span className="font-display text-2xl text-gold">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={handleSubmit} className="hidden lg:block w-full gold-gradient text-white py-4 rounded-xl font-body font-bold text-lg mt-6 shadow-lg">
                  Place Order
                </button>
              </div>

              {/* Favourite Items */}
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gold fill-gold" />
                  Your Favourites
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/5 bg-gold/5">
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0">
                      <img src={product} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold text-dark">Skin Repair Balm</p>
                      <p className="font-body text-xs text-gold">Rs. 2,800</p>
                    </div>
                    <button className="p-2 rounded-lg bg-gold text-white hover:scale-105 transition-transform">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Shield, text: "Secure Checkout" },
                  { icon: Truck, text: "Free Delivery" },
                  { icon: Package, text: "COD Available" }
                ].map((badge, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gold/10 text-center">
                    <badge.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="font-body text-xs text-muted-foreground">{badge.text}</p>
                  </div>
                ))}
              </div>

              {/* Guarantee */}
              <div className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/20 text-center">
                <p className="font-body text-sm text-dark">
                  <span className="font-semibold text-gold">100% Satisfaction Guarantee</span>
                  <br />
                  Not satisfied? Contact us within 7 days for a full refund.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-cream border-t border-gold/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src={logo} alt="Azzivone" className="h-6 mx-auto mb-4" />
          <p className="font-body text-muted-foreground text-sm">
            © 2026 Azzivone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
