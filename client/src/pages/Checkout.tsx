import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema } from "@shared/schema";
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
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    coupon: "",
    courier: "tcs",
    bank: "",
    jazzcashNumber: "",
    easypaisaNumber: "",
    cardHolder: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    bankAccount: ""
  });

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const pricePerUnit = 3500;
  
  const shippingCharges = {
    tcs: 350,
    daewoo: 400
  };

  const currentShipping = paymentMethod === "cod" ? shippingCharges[formData.courier as keyof typeof shippingCharges] : 0;
  const subtotal = quantity * pricePerUnit;
  const total = subtotal + currentShipping;

  const orderMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Order Placed Successfully",
        description: "We've received your order and will contact you soon.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  });

  const pakistanDistricts = [
    "Attock", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Chakwal", "Chiniot", "Dera Ghazi Khan", "Faisalabad", "Gujranwala", "Gujrat", "Hafizabad", "Jhang", "Jhelum", "Kasur", "Khanewal", "Khushab", "Lahore", "Layyah", "Lodhran", "Mandi Bahauddin", "Mianwali", "Multan", "Muzaffargarh", "Nankana Sahib", "Narowal", "Okara", "Pakpattan", "Rahim Yar Khan", "Rajanpur", "Rawalpindi", "Sahiwal", "Sargodha", "Sheikhupura", "Sialkot", "Toba Tek Singh", "Vehari",
    "Badin", "Dadu", "Ghotki", "Hyderabad", "Jacobabad", "Jamshoro", "Karachi Central", "Karachi East", "Karachi South", "Karachi West", "Korangi", "Malir", "Kashmore", "Khairpur", "Larkana", "Matiari", "Mirpur Khas", "Naushahro Feroze", "Qambar Shahdadkot", "Sanghar", "Shaheed Benazirabad", "Shikarpur", "Sujawal", "Sukkur", "Tando Allahyar", "Tando Muhammad Khan", "Tharparkar", "Thatta", "Umerkot",
    "Abbottabad", "Bannu", "Battagram", "Buner", "Charsadda", "Chitral", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Kohat", "Kohistan", "Lakki Marwat", "Lower Dir", "Malakand", "Mansehra", "Mardan", "Nowshera", "Peshawar", "Shangla", "Swabi", "Swat", "Tank", "Tor Ghar", "Upper Dir",
    "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kachhi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat",
    "Islamabad"
  ].sort();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      address: formData.address,
      city: formData.city,
      quantity: quantity.toString(),
      totalPrice: total.toString(),
      paymentMethod,
      courier: paymentMethod === "cod" ? formData.courier : null,
      notes: formData.notes || null,
    };
    
    orderMutation.mutate(orderData);
  };

  const paymentOptions = [
    { id: "cod", name: "Cash on Delivery", icon: Package, desc: "Pay at your doorstep" },
    { id: "bank", name: "Bank Transfer", icon: Building2, desc: "Direct bank deposit" },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone, desc: "Instant mobile payment" },
    { id: "easypaisa", name: "EasyPaisa", icon: Wallet, desc: "Instant mobile payment" },
    { id: "atm", name: "ATM/Debit Card", icon: CreditCard, desc: "All local cards supported" }
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-[6px] elegant-shadow border border-gold/5 text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-3xl text-dark mb-4">Order Successful!</h2>
          <p className="font-body text-dark/60 mb-8">
            Thank you for your purchase. We've received your order and will contact you shortly for confirmation.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-[#FAFAF9] rounded-[4px] border border-gold/5 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Order Amount</span>
                <span className="text-sm font-bold text-gold">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Payment</span>
                <span className="text-sm font-bold text-dark">{paymentOptions.find(o => o.id === paymentMethod)?.name}</span>
              </div>
            </div>
            <Link href="/">
              <button className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-sm uppercase tracking-widest hover:shadow-lg transition-all">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="Your Name" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="03xx-xxxxxxx" />
                    </div>
                    <div>
                      <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm" placeholder="your@email.com" />
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
                    <textarea name="address" value={formData.address} onChange={handleInputChange} required rows={3} className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm resize-none" placeholder="House no, Street, Area..." />
                  </div>
                  <div>
                    <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">City / District</label>
                    <select 
                      name="city" 
                      required 
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-[4px] border border-gold/10 bg-[#FAFAF9] outline-none font-body text-sm appearance-none"
                    >
                      <option value="">Select City / District</option>
                      {pakistanDistricts.map(city => (
                        <option key={city} value={city.toLowerCase()}>{city}</option>
                      ))}
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
                    <div key={opt.id} className="space-y-4">
                      <label className={`flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer transition-all ${paymentMethod === opt.id ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/20'}`}>
                        <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="hidden" />
                        <div className={`w-10 h-10 rounded-[4px] flex items-center justify-center ${paymentMethod === opt.id ? 'gold-gradient text-white shadow-md' : 'bg-gold/10 text-gold'}`}>
                          <opt.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-body font-bold text-dark text-xs">{opt.name}</p>
                          <p className="font-body text-[10px] text-dark/40">{opt.desc}</p>
                        </div>
                      </label>

                      <AnimatePresence>
                        {paymentMethod === opt.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-[#FAFAF9] border border-gold/5 rounded-[4px] space-y-4">
                              {opt.id === "cod" && (
                                <div className="space-y-4">
                                  <label className="font-body text-[10px] text-dark/40 font-bold block uppercase tracking-widest">Select Courier Service</label>
                                  <div className="grid grid-cols-1 gap-2">
                                    <label className="flex items-center gap-3 p-3 bg-white border border-gold/10 rounded-[4px] cursor-pointer">
                                      <input type="radio" name="courier" value="tcs" checked={formData.courier === "tcs"} onChange={handleInputChange} />
                                      <div className="flex-1 flex justify-between items-center">
                                        <span className="text-xs font-body text-dark">TCS (2-3 Days)</span>
                                        <span className="text-[10px] font-bold text-gold">Rs. 350</span>
                                      </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-white border border-gold/10 rounded-[4px] cursor-pointer">
                                      <input type="radio" name="courier" value="daewoo" checked={formData.courier === "daewoo"} onChange={handleInputChange} />
                                      <div className="flex-1 flex justify-between items-center">
                                        <span className="text-xs font-body text-dark">Daewoo Express (48 Hours)</span>
                                        <span className="text-[10px] font-bold text-gold">Rs. 400</span>
                                      </div>
                                    </label>
                                  </div>
                                  <p className="text-[9px] text-dark/40 italic">* Note: Delivery may take longer for minor cities.</p>
                                </div>
                              )}

                              {opt.id === "bank" && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">Select Bank</label>
                                    <select name="bank" value={formData.bank} onChange={handleInputChange} className="w-full px-4 py-2 rounded-[4px] border border-gold/10 bg-white outline-none font-body text-xs">
                                      <option value="">Select Bank</option>
                                      <option value="mcb">MCB Bank</option>
                                      <option value="hbl">HBL (Habib Bank Limited)</option>
                                      <option value="uabl">UBL (United Bank Limited)</option>
                                      <option value="meezan">Meezan Bank</option>
                                      <option value="alfalah">Bank Alfalah</option>
                                    </select>
                                  </div>
                                  {formData.bank && (
                                    <div className="p-3 bg-gold/5 border border-gold/10 rounded-[4px]">
                                      <p className="text-[10px] font-bold text-gold uppercase mb-1">Account Details</p>
                                      <p className="text-xs font-body text-dark">Account Number: <span className="font-bold">0123 4567 8901 2345</span></p>
                                      <p className="text-xs font-body text-dark">Title: <span className="font-bold">AZZIVONE PREMIUM</span></p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {(opt.id === "jazzcash" || opt.id === "easypaisa") && (
                                <div className="space-y-4">
                                  <label className="font-body text-[10px] text-dark/40 font-bold mb-2 block uppercase tracking-widest">{opt.name} Number</label>
                                  <input 
                                    type="tel" 
                                    name={`${opt.id}Number`} 
                                    value={opt.id === "jazzcash" ? formData.jazzcashNumber : formData.easypaisaNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-[4px] border border-gold/10 bg-white outline-none font-body text-xs" 
                                    placeholder="03xx-xxxxxxx" 
                                  />
                                </div>
                              )}

                              {opt.id === "atm" && (
                                <div className="space-y-4">
                                  <div className="flex gap-4 mb-2">
                                    <div className="px-3 py-1 bg-white border border-gold/10 rounded text-[10px] font-bold text-dark/40">VISA</div>
                                    <div className="px-3 py-1 bg-white border border-gold/10 rounded text-[10px] font-bold text-dark/40">MASTER</div>
                                    <div className="px-3 py-1 bg-white border border-gold/10 rounded text-[10px] font-bold text-dark/40">UNIONPAY</div>
                                  </div>
                                  <input type="text" name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} className="w-full px-4 py-2 rounded-[4px] border border-gold/10 bg-white outline-none font-body text-xs mb-2" placeholder="Card Holder Name" />
                                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 rounded-[4px] border border-gold/10 bg-white outline-none font-body text-xs" placeholder="Card Number" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
                        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 flex items-center justify-center text-gold text-sm font-bold">-</button>
                        <span className="font-body font-bold text-xs px-3">{quantity}</span>
                        <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gold text-sm font-bold">+</button>
                      </div>
                      <p className="font-display text-lg text-gold">Rs. {subtotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="py-8 space-y-3">
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-dark/40">Subtotal</span>
                    <span className="text-dark font-bold">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-dark/40">Shipping ({formData.courier.toUpperCase()})</span>
                    <span className="text-gold font-bold">
                      {currentShipping > 0 ? `Rs. ${currentShipping}` : "Free"}
                    </span>
                  </div>
                  
                  {/* Selected Payment Info */}
                  <div className="pt-4 border-t border-gold/5 space-y-2">
                    <div className="flex justify-between font-body text-[10px] uppercase tracking-widest">
                      <span className="text-dark/40">Payment Method</span>
                      <span className="text-gold font-bold">{paymentOptions.find(o => o.id === paymentMethod)?.name}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between font-body text-[10px] uppercase tracking-widest">
                        <span className="text-dark/40">Courier</span>
                        <span className="text-dark font-bold">{formData.courier === "daewoo" ? "Daewoo Express" : "TCS"}</span>
                      </div>
                    )}
                    {paymentMethod === "bank" && formData.bank && (
                      <div className="flex justify-between font-body text-[10px] uppercase tracking-widest">
                        <span className="text-dark/40">Bank</span>
                        <span className="text-dark font-bold">{formData.bank.toUpperCase()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gold/5">
                    <span className="font-display text-xl text-dark">Total</span>
                    <span className="font-display text-3xl text-gold">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={orderMutation.isPending}
                  className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-base hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
                >
                  {orderMutation.isPending ? "Processing..." : "Complete Purchase"}
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

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark/80 backdrop-blur-md"
              onClick={() => setIsSuccess(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl elegant-shadow overflow-hidden text-center p-8 border border-gold/20"
            >
              {/* Celebration Explosion */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl"
              >
                🎉
              </motion.div>
              
              <div className="w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl border-2 border-gold/20">
                <img src={product} className="w-full h-full object-cover" alt="Snail Mucin" />
              </div>

              <h2 className="font-display text-3xl text-dark mb-2">Congratulations! 🎉</h2>
              <p className="text-dark/40 font-bold uppercase tracking-widest text-[10px] mb-6">Order Placed Successfully</p>
              
              <div className="bg-gold/5 border border-gold/10 p-4 rounded-xl mb-8">
                <p className="text-sm text-dark font-body">Your skin is about to get that elite <span className="text-gold font-bold">Glass-Glow</span> treatment.</p>
              </div>

              <Link href="/">
                <button className="w-full gold-gradient text-white py-4 rounded-[6px] font-body font-bold text-base uppercase tracking-widest shadow-lg shadow-gold/20">
                  Back to Home
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
