import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield, Truck, CheckCircle, Package, CreditCard, MapPin, Phone, User, Mail } from "lucide-react";
import logo from "@assets/logo_1768257103773.png";
import product from "@assets/4_1768257083474.png";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: ""
  });

  const [quantity, setQuantity] = useState(1);
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
            <p className="font-body text-muted-foreground mb-8">
              Fill in your details below. Cash on Delivery available.
            </p>

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
                        data-testid="input-name"
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
                          data-testid="input-phone"
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
                          data-testid="input-email"
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
                      data-testid="input-address"
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
                      data-testid="select-city"
                    >
                      <option value="">Select your city</option>
                      <option value="karachi">Karachi</option>
                      <option value="lahore">Lahore</option>
                      <option value="islamabad">Islamabad</option>
                      <option value="rawalpindi">Rawalpindi</option>
                      <option value="faisalabad">Faisalabad</option>
                      <option value="multan">Multan</option>
                      <option value="peshawar">Peshawar</option>
                      <option value="quetta">Quetta</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-sm text-dark mb-1.5 block">Order Notes (Optional)</label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions..."
                      className="w-full px-4 py-3.5 rounded-xl border border-gold/20 bg-cream/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body"
                      data-testid="input-notes"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow">
                <h3 className="font-display text-xl text-dark mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Payment Method
                </h3>
                
                <div className="p-4 rounded-xl bg-gold/5 border-2 border-gold flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-dark">Cash on Delivery</p>
                    <p className="font-body text-sm text-muted-foreground">Pay when you receive your order</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-gold ml-auto" />
                </div>
              </div>

              {/* Submit Button - Mobile */}
              <button
                type="submit"
                className="lg:hidden w-full gold-gradient text-white py-4 rounded-xl font-body font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
                data-testid="button-submit-mobile"
              >
                Place Order — Rs. {total.toLocaleString()}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl p-6 border border-gold/10 elegant-shadow mb-6">
                <h3 className="font-display text-xl text-dark mb-6">Order Summary</h3>
                
                {/* Product */}
                <div className="flex gap-4 pb-6 border-b border-gold/10">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                    <img src={product} alt="Snail Mucin Serum" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-dark">Snail Mucin Serum</h4>
                    <p className="font-body text-sm text-muted-foreground mb-3">96% Pure • 30ml</p>
                    
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors font-body font-bold"
                        data-testid="button-decrease-qty"
                      >
                        −
                      </button>
                      <span className="font-body font-semibold text-dark w-8 text-center" data-testid="text-quantity">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors font-body font-bold"
                        data-testid="button-increase-qty"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-gold">Rs. {pricePerUnit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Totals */}
                <div className="py-6 space-y-3">
                  <div className="flex justify-between font-body">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-dark">Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-gold font-semibold">FREE</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/10">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xl text-dark">Total</span>
                    <span className="font-display text-2xl text-gold" data-testid="text-total">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Button - Desktop */}
                <button
                  type="submit"
                  form="checkout-form"
                  onClick={handleSubmit}
                  className="hidden lg:block w-full gold-gradient text-white py-4 rounded-xl font-body font-bold text-lg mt-6 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                  data-testid="button-submit-desktop"
                >
                  Place Order
                </button>
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
