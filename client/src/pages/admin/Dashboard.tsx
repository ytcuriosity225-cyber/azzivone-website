import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  LogOut, 
  Users, 
  ShoppingCart, 
  Eye, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  ChevronRight, 
  Plus, 
  Save, 
  Globe, 
  Package, 
  Video,
  CheckCircle2,
  Clock,
  Star,
  Activity,
  History,
  Type,
  Maximize2,
  Monitor,
  Search,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const stats = [
  { label: "Total Visitors", value: "12,480", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Total Orders", value: "824", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Add to Carts", value: "3,982", icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Conversion Rate", value: "6.8%", icon: Activity, color: "text-gold", bg: "bg-gold/10" },
];

const locations = [
  { city: "Lahore", count: "4,210", percent: 45 },
  { city: "Karachi", count: "3,150", percent: 32 },
  { city: "Islamabad", count: "1,840", percent: 18 },
  { city: "Faisalabad", count: "450", percent: 5 },
];

const changelog = [
  { action: "Hero text updated", time: "2 mins ago" },
  { action: "Review from Sara K. removed", time: "1 hour ago" },
  { action: "Main product image replaced", time: "3 hours ago" },
  { action: "Benefits list reordered", time: "5 hours ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("homepage");
  const [previewMode, setPreviewMode] = useState(false);

  // Preview States
  const [heroHeading, setHeroHeading] = useState("Azzivone Snail Mucin Serum");
  const [productPrice, setProductPrice] = useState("2,499");

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex font-body selection:bg-gold/10">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gold/10 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
              <Zap className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="font-display text-xl text-dark leading-none">Azzivone</h1>
              <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] mt-1">Control Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "content", label: "Website Content", icon: FileText },
            { id: "product", label: "Product Page", icon: Package },
            { id: "reviews", label: "Reviews & Proof", icon: MessageSquare },
            { id: "media", label: "Media Library", icon: ImageIcon },
            { id: "theme", label: "Theme Controls", icon: Type },
            { id: "analytics", label: "Analytics (Preview)", icon: BarChart3 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === item.id 
                  ? "bg-gold text-white font-bold shadow-lg shadow-gold/20" 
                  : "text-dark/40 hover:bg-gold/5 hover:text-dark/60"
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-white" : "group-hover:text-gold transition-colors"}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gold/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-dark/40 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#FAFAF9] px-3 py-1.5 rounded-lg border border-gold/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-dark/60">System Online</span>
            </div>
            <div className="h-4 w-px bg-gold/10" />
            <p className="text-xs font-medium text-dark/40">Phase 1: Visual Control Mode</p>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(!previewMode)}
              className={`border-gold/20 flex gap-2 h-10 px-6 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${previewMode ? 'bg-dark text-white border-dark' : 'text-gold hover:bg-gold/5'}`}
            >
              <Monitor className="w-4 h-4" /> {previewMode ? "Exit Preview" : "Live Preview"}
            </Button>
            <Button className="gold-gradient text-white flex gap-2 h-10 px-6 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-gold/20">
              <Save className="w-4 h-4" /> Publish Changes
            </Button>
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {activeTab === "dashboard" && (
              <div className="space-y-12">
                <section>
                  <h2 className="font-display text-4xl text-dark mb-2">Executive Dashboard</h2>
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-gold" />
                    <p className="text-dark/40 text-sm italic">Live data will activate after backend integration</p>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card key={i} className="border-gold/5 elegant-shadow hover:translate-y-[-4px] transition-all duration-300">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-display text-dark">{stat.value}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <Card className="border-gold/5 elegant-shadow overflow-hidden">
                      <CardHeader className="bg-gold/5 border-b border-gold/10">
                        <CardTitle className="font-display text-xl">Visitor Traffic Trends</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64 flex flex-col items-center justify-center p-8 text-center bg-white">
                        <BarChart3 className="w-16 h-16 text-gold/20 mb-4" />
                        <p className="text-dark/40 text-sm font-medium">Metric visualization pending data pipeline connection</p>
                      </CardContent>
                    </Card>

                    <Card className="border-gold/5 elegant-shadow">
                      <CardHeader>
                        <CardTitle className="font-display text-xl flex items-center gap-2">
                          <History className="w-5 h-5 text-gold" /> Activity Log
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {changelog.map((log, i) => (
                          <div key={i} className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-gold/30" />
                              <span className="text-sm font-medium text-dark/70">{log.action}</span>
                            </div>
                            <span className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{log.time}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-gold/5 elegant-shadow">
                    <CardHeader>
                      <CardTitle className="font-display text-xl">Top Regions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {locations.map((loc, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-dark/60">{loc.city}</span>
                            <span className="text-dark/40">{loc.count}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gold/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${loc.percent}%` }}
                              className="h-full bg-gold"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="pt-8 flex flex-col items-center">
                         <div className="w-full aspect-square bg-gold/5 rounded-2xl border border-dashed border-gold/20 flex items-center justify-center">
                            <MapPin className="w-12 h-12 text-gold/20" />
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-8">
                <header>
                  <h2 className="font-display text-4xl text-dark">Website Content</h2>
                  <p className="text-dark/40 mt-1">Manage the narrative of your brand</p>
                </header>

                <Tabs defaultValue="hero" className="space-y-6">
                  <TabsList className="bg-white border border-gold/10 p-1.5 h-auto rounded-2xl shadow-sm">
                    <TabsTrigger value="hero" className="px-8 py-3 rounded-xl data-[state=active]:bg-gold data-[state=active]:text-white font-bold transition-all">Hero Section</TabsTrigger>
                    <TabsTrigger value="pages" className="px-8 py-3 rounded-xl data-[state=active]:bg-gold data-[state=active]:text-white font-bold transition-all">Page Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hero" className="space-y-6">
                    <Card className="border-gold/5 elegant-shadow p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Hero Heading</Label>
                            <Input 
                              value={heroHeading}
                              onChange={(e) => setHeroHeading(e.target.value)}
                              className="border-gold/10 h-14 text-lg font-medium focus:ring-gold/20" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Hero Subheading</Label>
                            <Textarea 
                              defaultValue="High-performance snail mucin serum designed for those who demand excellence."
                              className="border-gold/10 min-h-[120px] focus:ring-gold/20" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">CTA Button Text</Label>
                            <Input defaultValue="Shop the Elite Collection" className="border-gold/10 h-12" />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Primary Hero Media</Label>
                          <div className="aspect-video bg-gold/5 rounded-2xl border-2 border-dashed border-gold/20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gold/10 transition-all group overflow-hidden relative">
                             <ImageIcon className="w-12 h-12 text-gold/30 group-hover:scale-110 transition-transform" />
                             <span className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Replace Hero Image</span>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Hero Video URL (Optional)</Label>
                            <Input placeholder="https://youtube.com/..." className="border-gold/10" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "product" && (
              <div className="space-y-8">
                <header>
                  <h2 className="font-display text-4xl text-dark">Product Details</h2>
                  <p className="text-dark/40 mt-1">Refine your product presentation</p>
                </header>

                <Card className="border-gold/5 elegant-shadow p-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Product Name</Label>
                              <Input defaultValue="Snail Mucin Serum" className="border-gold/10 h-12" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Base Price</Label>
                              <div className="relative">
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40 font-bold">$</span>
                                 <Input defaultValue="2,499" className="border-gold/10 h-12 pl-8" />
                              </div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Description</Label>
                           <Textarea defaultValue="Glass-Glow Skin, Engineered for High-Performance Lives." className="border-gold/10 min-h-[100px]" />
                        </div>
                        <div className="space-y-4">
                           <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Benefits (Add/Remove)</Label>
                           <div className="space-y-2">
                              {["Deep hydration", "Scar healing", "Barrier repair"].map((b, i) => (
                                <div key={i} className="flex items-center gap-2">
                                   <Input defaultValue={b} className="border-gold/10 h-10" />
                                   <Button variant="ghost" size="sm" className="text-red-400">Remove</Button>
                                </div>
                              ))}
                              <Button variant="ghost" className="text-gold text-[10px] font-bold uppercase tracking-widest">+ Add Benefit</Button>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-8 bg-gold/5 p-8 rounded-2xl border border-gold/10">
                        <h4 className="font-display text-xl text-dark">Psychological Narrative</h4>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Problem</Label>
                              <Textarea defaultValue="Persistent dryness and visible acne scars." className="border-gold/10" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Agitation</Label>
                              <Textarea defaultValue="Every day without proper repair is a day your skin loses elasticity." className="border-gold/10" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Solution</Label>
                              <Textarea defaultValue="Azzivone uses 96% Pure Snail Mucin to reset your skin." className="border-gold/10" />
                           </div>
                        </div>
                      </div>
                   </div>
                </Card>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <header>
                  <h2 className="font-display text-4xl text-dark">Reviews & Proof</h2>
                  <p className="text-dark/40 mt-1">Curate your brand's social reputation</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-gold/5 elegant-shadow p-8 space-y-6">
                     <div className="flex items-center justify-between">
                        <CardTitle className="font-display text-xl">Review Sections</CardTitle>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white border border-gold/10 rounded-xl">
                           <div>
                              <p className="text-sm font-bold text-dark">WhatsApp Screenshots</p>
                              <p className="text-[10px] text-dark/40 font-bold uppercase mt-1">Toggle Visibility</p>
                           </div>
                           <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white border border-gold/10 rounded-xl">
                           <div>
                              <p className="text-sm font-bold text-dark">Doctor Endorsements</p>
                              <p className="text-[10px] text-dark/40 font-bold uppercase mt-1">Toggle Visibility</p>
                           </div>
                           <Switch defaultChecked />
                        </div>
                     </div>
                  </Card>

                  <Card className="border-gold/5 elegant-shadow p-8">
                     <CardTitle className="font-display text-xl mb-6">Live Social Feed</CardTitle>
                     <div className="grid grid-cols-3 gap-3">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="aspect-square bg-gold/5 rounded-lg border border-gold/10 flex items-center justify-center relative group overflow-hidden">
                             <ImageIcon className="w-6 h-6 text-gold/20" />
                             <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:text-red-400">×</Button>
                             </div>
                          </div>
                        ))}
                        <div className="aspect-square border-2 border-dashed border-gold/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gold/5 transition-all">
                           <Plus className="w-6 h-6 text-gold/40" />
                        </div>
                     </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "theme" && (
              <div className="space-y-8">
                 <header>
                  <h2 className="font-display text-4xl text-dark">Theme & Branding</h2>
                  <p className="text-dark/40 mt-1">Visual identity system</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-gold/5 elegant-shadow p-8 space-y-8">
                     <div className="space-y-4">
                        <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Gold Accent Variations</Label>
                        <div className="flex gap-4">
                           {["#D4AF37", "#B8860B", "#DAA520"].map(color => (
                              <button key={color} className="w-12 h-12 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110" style={{ backgroundColor: color }} />
                           ))}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Font Scale</Label>
                        <div className="flex gap-2">
                           {["Small", "Default", "Large"].map(s => (
                              <Button key={s} variant={s === "Default" ? "default" : "outline"} className={`flex-1 h-12 rounded-xl ${s === "Default" ? "gold-gradient text-white border-0" : "border-gold/20 text-gold"}`}>
                                {s}
                              </Button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Button Styling</Label>
                        <div className="flex gap-2">
                           <Button variant="outline" className="flex-1 h-12 rounded-none border-gold/20 text-gold">Sharp</Button>
                           <Button variant="outline" className="flex-1 h-12 rounded-xl border-gold/20 text-gold">Soft</Button>
                           <Button variant="outline" className="flex-1 h-12 rounded-full border-gold/20 text-gold">Round</Button>
                        </div>
                     </div>
                  </Card>

                  <div className="space-y-4 bg-white p-12 rounded-2xl border border-gold/10 flex flex-col items-center justify-center text-center">
                     <div className="w-20 h-20 rounded-full gold-gradient mb-6" />
                     <h3 className="font-display text-2xl text-dark">Aesthetic Preview</h3>
                     <p className="text-dark/40 mt-4 mb-8">This panel ensures visual consistency across the entire Azzivone ecosystem.</p>
                     <Button className="gold-gradient text-white px-12 h-12 rounded-full font-bold uppercase tracking-widest text-xs">Test Component</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-8">
                 <header>
                  <h2 className="font-display text-4xl text-dark">System Settings</h2>
                  <p className="text-dark/40 mt-1">Infrastructure & environment control</p>
                </header>

                <Card className="border-gold/5 elegant-shadow p-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Backend Status</p>
                            <div className="flex items-center gap-3 text-amber-500 font-bold">
                               <Clock className="w-5 h-5" />
                               <span>Not connected (Phase 2)</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Auth Environment</p>
                            <div className="flex items-center gap-3 text-dark/40 font-bold">
                               <Settings className="w-5 h-5" />
                               <span>Frontend Demo Mode Only</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40">System Version</p>
                            <p className="text-sm font-medium text-dark/60 italic underline decoration-gold/30">Azzivone v1.0.0-alpha</p>
                         </div>
                      </div>

                      <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                         <h4 className="font-bold text-emerald-800 mb-2">Ready for Handover</h4>
                         <p className="text-sm text-emerald-700 leading-relaxed">
                            This panel is architected to be "Backend-Ready". All UI components are modular and state-driven, ensuring a seamless transition when the database layer is integrated.
                         </p>
                         <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" /> Final Phase 1 Deliverable
                         </div>
                      </div>
                   </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
