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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const paymentOptions = [
    { id: "cod", name: "Cash on Delivery", icon: Package, desc: "Pay at your doorstep" },
    { id: "bank", name: "Bank Transfer", icon: Building2, desc: "Direct bank deposit" },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone, desc: "Instant mobile payment" },
    { id: "easypaisa", name: "EasyPaisa", icon: Wallet, desc: "Instant mobile payment" },
    { id: "atm", name: "ATM/Debit Card", icon: CreditCard, desc: "All local cards supported" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative selection:bg-gold/10">
      <FloatingIcons />
      
      {/* Header */}
      <header className="bg-[#FAFAF9]/80 backdrop-blur-md border-b border-gold/5 sticky top-0 z-50 px-4">
        <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
          <Link href="/product">
            <button className="flex items-center gap-2 text-dark font-bold hover:text-gold transition-colors font-body text-xs uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>
          <img src={logo} alt="Azzivone" className="h-10 md:h-12" />
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Order Form */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1 space-y-6">
            <h1 className="font-display text-4xl text-dark mb-4">Secure Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-8 rounded-[6px] elegant-shadow border border-gold/5">
                <h3 className="font-display text-xl text-dark mb-8 flex items-center gap-3">
                  <User className="w-5 h-5 text-gold" />
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Full Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="Your Name" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Phone</label>
                      <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="03xx-xxxxxxx" />
                    </div>
                    <div>
                      <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Email</label>
                      <input type="email" name="email" className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="your@email.com" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[6px] elegant-shadow border border-gold/5">
                <h3 className="font-display text-xl text-dark mb-8 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  Delivery
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Complete Address</label>
                    <textarea name="address" required rows={3} className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm resize-none" placeholder="House no, Street, Area..." />
                  </div>
                  <div>
                    <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">City</label>
                    <select name="city" required className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm appearance-none">
                      <option value="">Select City</option>
                      <option value="karachi">Karachi</option>
                      <option value="lahore">Lahore</option>
                      <option value="islamabad">Islamabad</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[6px] elegant-shadow border border-gold/5">
                <h3 className="font-display text-xl text-dark mb-8 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Payment
                </h3>
                <div className="space-y-3">
                  {paymentOptions.map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer transition-all ${paymentMethod === opt.id ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/20'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="hidden" />
                      <div className={`w-10 h-10 rounded-[4px] flex items-center justify-center ${paymentMethod === opt.id ? 'gold-gradient text-white shadow-md' : 'bg-gold/10 text-gold'}`}>
                        <opt.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body font-bold text-dark text-xs">{opt.name}</p>
                        <p className="font-body text-[10px] text-dark/40">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white p-8 rounded-[6px] elegant-shadow border border-gold/5">
                <h3 className="font-display text-xl text-dark mb-8">Order Summary</h3>
                <div className="flex gap-4 pb-8 border-b border-gold/5">
                  <div className="w-20 h-24 rounded-[4px] bg-[#FAFAF9] overflow-hidden border border-gold/5">
                    <img src={product} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-lg text-dark">Azzivone Serum</h4>
                      <p className="font-body text-[10px] text-dark/40 uppercase tracking-widest">30ml • 96% Mucin</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gold/10 rounded-[4px] p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 flex items-center justify-center text-gold text-sm font-bold">-</button>
                        <span className="font-body font-bold text-xs px-3">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gold text-sm font-bold">+</button>
                      </div>
                      <p className="font-display text-lg text-gold">Rs. {total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="py-8 space-y-3">
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-dark/40">Subtotal</span>
                    <span className="text-dark font-bold">Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-dark/40">Shipping</span>
                    <span className="text-gold font-bold uppercase tracking-widest">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gold/5">
                    <span className="font-display text-xl text-dark">Total</span>
                    <span className="font-display text-3xl text-gold">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={handleSubmit} className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-base hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest">
                  Complete Purchase
                </button>

                <div className="mt-8 flex justify-center gap-6 opacity-30">
                  <Shield className="w-5 h-5" />
                  <Truck className="w-5 h-5" />
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="py-12 text-center relative z-10 px-6">
        <p className="font-body text-[8px] text-dark/20 tracking-[0.4em] uppercase">© 2026 Azzivone. Secure Prototype.</p>
      </footer>
    </div>
  );
}
