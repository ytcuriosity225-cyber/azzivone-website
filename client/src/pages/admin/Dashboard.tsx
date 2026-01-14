import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, BarChart3, Settings, LogOut, Users, ShoppingCart, Eye, MapPin,
  FileText, Image as ImageIcon, MessageSquare, Plus, Save, Monitor, Clock, History, Type, Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// === Mock Data (can be replaced with API calls later) ===
const mockStats = [
  { id: 1, label: "Total Visitors", value: "12,480", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, label: "Total Orders", value: "824", icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-50" },
  { id: 3, label: "Add to Carts", value: "3,982", icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 4, label: "Conversion Rate", value: "6.8%", icon: History, color: "text-gold", bg: "bg-gold/10" },
];

const mockLocations = [
  { city: "Lahore", count: 4210, percent: 45 },
  { city: "Karachi", count: 3150, percent: 32 },
  { city: "Islamabad", count: 1840, percent: 18 },
  { city: "Faisalabad", count: 450, percent: 5 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previewMode, setPreviewMode] = useState(false);

  // === Controlled States for Content ===
  const [heroHeading, setHeroHeading] = useState("Azzivone Snail Mucin Serum");
  const [heroSubheading, setHeroSubheading] = useState("High-performance snail mucin serum designed for those who demand excellence.");
  const [ctaText, setCtaText] = useState("Shop the Elite Collection");
  const [productPrice, setProductPrice] = useState("2,499");
  const [benefits, setBenefits] = useState(["Deep hydration", "Scar healing", "Barrier repair"]);

  // === Placeholder Handlers for Future Backend Integration ===
  const handleSave = () => {
    console.log("Save / Publish called, integrate API here.");
  };
  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]);
  };
  const handleRemoveBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF9] font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gold/10 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center"><Zap className="text-white w-4 h-4" /></div>
            <div>
              <h1 className="text-xl font-display text-dark leading-none">Azzivone</h1>
              <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] mt-1">Control Center</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "content", label: "Website Content", icon: FileText },
            { id: "product", label: "Product Page", icon: ShoppingCart },
            { id: "media", label: "Media Library", icon: ImageIcon },
            { id: "theme", label: "Theme Controls", icon: Type },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === item.id ? "bg-gold text-white font-bold" : "text-dark/40 hover:bg-gold/5"}`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-white" : "text-dark/60"}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-gold/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-dark/40 hover:bg-red-50 hover:text-red-500 rounded-xl">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#FAFAF9] px-3 py-1.5 rounded-lg border border-gold/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-dark/60">System Online</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setPreviewMode(!previewMode)} variant="outline">
              <Monitor className="w-4 h-4" /> {previewMode ? "Exit Preview" : "Live Preview"}
            </Button>
            <Button onClick={handleSave} className="gold-gradient text-white flex gap-2 h-10 px-6 rounded-full font-bold text-[10px]">
              <Save className="w-4 h-4" /> Publish Changes
            </Button>
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-12">
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              <h2 className="text-4xl font-display text-dark">Executive Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStats.map(stat => (
                  <Card key={stat.id} className="border-gold/5 p-6">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-dark/40">{stat.label}</p>
                    <h3 className="text-3xl font-display text-dark">{stat.value}</h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-display text-dark">Website Content</h2>
              <Tabs defaultValue="hero">
                <TabsList className="bg-white border border-gold/10 p-1.5 rounded-2xl shadow-sm">
                  <TabsTrigger value="hero">Hero Section</TabsTrigger>
                  <TabsTrigger value="pages">Page Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="hero">
                  <Card className="p-8 border-gold/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <Label>Hero Heading</Label>
                        <Input value={heroHeading} onChange={e => setHeroHeading(e.target.value)} />
                        <Label>Hero Subheading</Label>
                        <Textarea value={heroSubheading} onChange={e => setHeroSubheading(e.target.value)} />
                        <Label>CTA Text</Label>
                        <Input value={ctaText} onChange={e => setCtaText(e.target.value)} />
                      </div>
                      <div className="space-y-6">
                        <Label>Primary Hero Media</Label>
                        <div className="aspect-video bg-gold/5 rounded-2xl flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gold/30" />
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
              <h2 className="text-4xl font-display text-dark">Product Details</h2>
              <Card className="p-8 border-gold/5">
                <Label>Product Price</Label>
                <Input value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                <Label>Benefits</Label>
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={b} onChange={e => { const newB = [...benefits]; newB[i] = e.target.value; setBenefits(newB); }} />
                    <Button onClick={() => handleRemoveBenefit(i)} variant="ghost" className="text-red-400">Remove</Button>
                  </div>
                ))}
                <Button onClick={handleAddBenefit} variant="ghost" className="text-gold text-[10px]">+ Add Benefit</Button>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}