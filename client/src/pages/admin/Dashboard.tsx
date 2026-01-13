import { useState } from "react";
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
  Star
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
  { label: "Total Customers", value: "1,236", icon: Users, color: "text-gold", bg: "bg-gold/10" },
  { label: "Add to Carts", value: "3,982", icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Orders", value: "824", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
];

const locations = [
  { city: "Lahore", count: "4,210", percent: 45 },
  { city: "Karachi", count: "3,150", percent: 32 },
  { city: "Islamabad", count: "1,840", percent: 18 },
  { city: "Faisalabad", count: "450", percent: 5 },
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-gold/10 elegant-shadow">
            <CardHeader className="text-center pb-2">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                  <Settings className="text-white w-6 h-6" />
                </div>
              </div>
              <CardTitle className="font-display text-2xl text-dark">Azzivone Admin</CardTitle>
              <p className="text-sm text-dark/40 uppercase tracking-widest font-bold mt-2">Elite Control Panel</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Email Address</Label>
                <Input 
                  type="email" 
                  placeholder="admin@azzivone.com" 
                  className="border-gold/20 focus:border-gold h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Password</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="border-gold/20 focus:border-gold h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full gold-gradient text-white h-12 font-bold uppercase tracking-widest mt-4 hover:shadow-lg transition-all"
              >
                Login to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gold/10 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h1 className="font-display text-2xl text-dark">Azzivone</h1>
          <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "content", label: "Content", icon: FileText },
            { id: "products", label: "Products", icon: Package },
            { id: "reviews", label: "Reviews", icon: MessageSquare },
            { id: "media", label: "Media", icon: ImageIcon },
            { id: "pages", label: "Pages", icon: Globe },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? "bg-gold/10 text-gold font-bold" 
                  : "text-dark/40 hover:bg-gold/5 hover:text-dark/60"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {activeTab === item.id && <motion.div layoutId="active" className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gold/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-4xl text-dark">Executive Overview</h2>
                  <p className="text-dark/40 mt-1">Welcome back, Administrator</p>
                </div>
                <div className="flex gap-4">
                  <select className="bg-white border border-gold/10 rounded-lg px-4 py-2 text-sm text-dark/60 focus:outline-none focus:ring-2 ring-gold/20 cursor-pointer">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Today</option>
                  </select>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={stat.label}
                  >
                    <Card className="border-gold/5 elegant-shadow hover:scale-[1.02] transition-transform cursor-default">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-display text-dark mt-1">{stat.value}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-gold/5 elegant-shadow">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Visitor Traffic</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center bg-gold/5 rounded-xl border border-dashed border-gold/20 m-6">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gold/30 mx-auto mb-2" />
                      <p className="text-dark/30 text-sm font-medium">Traffic Heatmap Visualization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold/5 elegant-shadow">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Top Locations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-2">
                    {locations.map((loc) => (
                      <div key={loc.city} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-dark/60">{loc.city}</span>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Content Manager View */}
          {activeTab === "content" && (
            <div className="space-y-8">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-4xl text-dark font-medium">Website Content Manager</h2>
                  <p className="text-dark/40 mt-1">Live updates across all luxury touchpoints</p>
                </div>
                <Button className="gold-gradient text-white flex gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </header>

              <Tabs defaultValue="homepage" className="space-y-6">
                <TabsList className="bg-white border border-gold/10 p-1 h-14 rounded-xl shadow-sm">
                  <TabsTrigger value="homepage" className="px-8 rounded-lg data-[state=active]:bg-gold/10 data-[state=active]:text-gold font-bold transition-all">Home Page</TabsTrigger>
                  <TabsTrigger value="product" className="px-8 rounded-lg data-[state=active]:bg-gold/10 data-[state=active]:text-gold font-bold transition-all">Product Page</TabsTrigger>
                  <TabsTrigger value="media" className="px-8 rounded-lg data-[state=active]:bg-gold/10 data-[state=active]:text-gold font-bold transition-all">Media Assets</TabsTrigger>
                </TabsList>

                <TabsContent value="homepage" className="space-y-6">
                  <Card className="border-gold/5 elegant-shadow">
                    <CardHeader className="border-b border-gold/10">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-gold" /> Hero Section
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Hero Headline</Label>
                            <Input defaultValue="Modern Skincare for Elite Performance" className="border-gold/10 h-12" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Subheading Text</Label>
                            <Textarea defaultValue="High-performance snail mucin serum designed for those who demand excellence." className="border-gold/10 min-h-[100px]" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">CTA Button Text</Label>
                            <Input defaultValue="Shop the Elite Collection" className="border-gold/10 h-12" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Visual Media</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[4/3] bg-gold/5 rounded-xl border-2 border-dashed border-gold/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gold/10 transition-all">
                              <ImageIcon className="w-8 h-8 text-gold/40 mb-2" />
                              <span className="text-[10px] font-bold text-dark/40 uppercase">Hero Image</span>
                            </div>
                            <div className="aspect-[4/3] bg-gold/5 rounded-xl border-2 border-dashed border-gold/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gold/10 transition-all">
                              <Video className="w-8 h-8 text-gold/40 mb-2" />
                              <span className="text-[10px] font-bold text-dark/40 uppercase">Hero Video</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="product" className="space-y-6">
                  <Card className="border-gold/5 elegant-shadow">
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Product Title</Label>
                            <Input defaultValue="Azzivone Snail Mucin Serum" className="border-gold/10 h-12" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Short Description</Label>
                            <Textarea defaultValue="Glass-Glow Skin, Engineered for High-Performance Lives." className="border-gold/10" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 bg-gold/5 rounded-xl border border-gold/10">
                            <div>
                              <Label className="text-sm font-bold text-dark">Customer Reactions</Label>
                              <p className="text-[10px] text-dark/40 font-bold uppercase tracking-widest mt-1">Toggle video section visibility</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gold/5 rounded-xl border border-gold/10">
                            <div>
                              <Label className="text-sm font-bold text-dark">Elite Choice Bar</Label>
                              <p className="text-[10px] text-dark/40 font-bold uppercase tracking-widest mt-1">Show stars and avatars</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Reviews Manager */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-4xl text-dark font-medium">Reviews & Social Proof</h2>
                  <p className="text-dark/40 mt-1">Manage what the world sees</p>
                </div>
                <Button className="gold-gradient text-white flex gap-2">
                  <Plus className="w-4 h-4" /> Add Review
                </Button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { type: "WhatsApp", status: "Approved", name: "Sara K." },
                  { type: "Video", status: "Pending", name: "Ahmed R." },
                  { type: "WhatsApp", status: "Approved", name: "Maria Z." },
                ].map((review, i) => (
                  <Card key={i} className="border-gold/5 elegant-shadow overflow-hidden group">
                    <CardHeader className="flex flex-row items-center justify-between bg-gold/5 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${review.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {review.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="text-[10px] font-bold uppercase text-dark/40">{review.type}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="aspect-[4/3] bg-gold/5 rounded-lg mb-4 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 transition-colors">
                        {review.type === 'Video' ? <Video className="w-8 h-8 text-gold/30" /> : <MessageSquare className="w-8 h-8 text-gold/30" />}
                      </div>
                      <h4 className="font-bold text-dark">{review.name}</h4>
                      <p className="text-xs text-dark/40 mt-1">Received 2 hours ago</p>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gold/5">
                        <Button variant="ghost" className="flex-1 text-[10px] uppercase font-bold tracking-widest h-8">Reject</Button>
                        <Button variant="outline" className="flex-1 border-gold/20 text-gold text-[10px] uppercase font-bold tracking-widest h-8">Approve</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-4xl text-dark font-medium">Brand Settings</h2>
                  <p className="text-dark/40 mt-1">Core identity configurations</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-gold/5 elegant-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Brand Identity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Brand Logo</Label>
                      <div className="w-full h-32 bg-white border border-gold/10 rounded-xl flex items-center justify-center p-8 group cursor-pointer hover:border-gold/30 transition-all">
                        <div className="text-center">
                          <Plus className="w-6 h-6 text-gold/30 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold text-dark/40 uppercase">Update Logo</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Primary Color</Label>
                        <div className="h-12 bg-gold rounded-lg border border-gold/20 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest">#D4AF37</span>
                        </div>
                      </div>
                      <div className="space-y-2 opacity-50">
                        <Label className="text-[10px] uppercase tracking-widest font-bold text-dark/40">Language (Disabled)</Label>
                        <div className="h-12 bg-white border border-gold/10 rounded-lg flex items-center px-4">
                          <span className="text-[10px] font-bold text-dark/40 uppercase">English (US)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold/5 elegant-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Page Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Home", status: "Live", date: "2 mins ago" },
                      { name: "Product", status: "Live", date: "4 mins ago" },
                      { name: "About", status: "Draft", date: "Never" },
                      { name: "Checkout", status: "Live", date: "1 hour ago" },
                    ].map((page) => (
                      <div key={page.name} className="flex items-center justify-between p-4 bg-white border border-gold/5 rounded-xl hover:border-gold/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${page.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <div>
                            <p className="text-sm font-bold text-dark">{page.name}</p>
                            <p className="text-[10px] text-dark/40 uppercase tracking-widest font-bold">Updated {page.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Settings className="w-4 h-4 text-dark/40" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="w-4 h-4 text-dark/40" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
