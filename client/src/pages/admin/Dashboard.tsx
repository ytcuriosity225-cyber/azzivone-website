import { useState, useEffect } from "react";
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
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Hero, type Product } from "@shared/schema";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previewMode, setPreviewMode] = useState(false);
  const [stats, setStats] = useState<any[]>([]);
  const { toast } = useToast();

  // === Form State for Content ===
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  
  // Product state management
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInventory, setProductInventory] = useState("");
  const [productStatus, setProductStatus] = useState("In Stock");
  const [benefits, setBenefits] = useState<string[]>([]);

  // Fetch Hero Content
  const { data: heroData } = useQuery<Hero>({
    queryKey: ["/api/dashboard/hero"],
  });

  // Fetch Products
  const { data: productsData = [] } = useQuery<Product[]>({
    queryKey: ["/api/dashboard/products"],
  });

  // Sync hero state
  useEffect(() => {
    if (heroData) {
      setHeroHeading(heroData.title);
      setHeroSubheading(heroData.subtitle);
      setCtaText(heroData.ctaText);
      setVideoUrl(heroData.videoUrl || "");
      setLogoUrl(heroData.logoUrl || "");
    }
  }, [heroData]);

  // Sync selected product state
  useEffect(() => {
    const p = productsData.find(p => p.id === selectedProductId) || productsData[0];
    if (p) {
      setSelectedProductId(p.id);
      setProductName(p.name);
      setProductPrice(p.price);
      setProductInventory(p.inventory);
      setProductStatus(p.status);
      setBenefits(p.bullets || []);
    }
  }, [productsData, selectedProductId]);

  const productMutation = useMutation({
    mutationFn: async (data: Partial<Product>) => {
      if (selectedProductId) {
        return apiRequest("PATCH", `/api/dashboard/products/${selectedProductId}`, data);
      }
      return apiRequest("POST", "/api/dashboard/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/products"] });
      toast({ title: "Success", description: "Product updated successfully" });
    }
  });

  const heroMutation = useMutation({
    mutationFn: async (data: Partial<Hero>) => {
      const res = await apiRequest("POST", "/api/dashboard/hero", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/hero"] });
      toast({ title: "Success", description: "Hero section updated" });
    }
  });

  const handleSave = () => {
    if (activeTab === "hero") {
      heroMutation.mutate({
        title: heroHeading, subtitle: heroSubheading, ctaText, videoUrl, logoUrl
      });
    } else if (activeTab === "product") {
      productMutation.mutate({
        name: productName, price: productPrice, inventory: productInventory,
        status: productStatus, bullets: benefits, image: productsData.find(p => p.id === selectedProductId)?.image || ""
      });
    }
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
                {stats.map(stat => (
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
                        <Label>Media URL (Video/Image)</Label>
                        <Input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://..." />
                        <Label>Logo URL</Label>
                        <Input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." />
                      </div>
                      <div className="space-y-6">
                        <Label>Primary Hero Media</Label>
                        <div className="aspect-video bg-gold/5 rounded-2xl flex items-center justify-center overflow-hidden">
                          {videoUrl ? (
                            videoUrl.endsWith('.mp4') ? (
                              <video src={videoUrl} className="w-full h-full object-cover" muted loop />
                            ) : (
                              <img src={videoUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                            )
                          ) : (
                            <ImageIcon className="w-12 h-12 text-gold/30" />
                          )}
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
                <div className="space-y-6">
                  <Label>Select Product</Label>
                  <select 
                    value={selectedProductId || ""} 
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full p-2 border border-gold/10 rounded-lg bg-[#FAFAF9]"
                  >
                    {productsData.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>

                  <Label>Product Name</Label>
                  <Input value={productName} onChange={e => setProductName(e.target.value)} />
                  
                  <Label>Product Price (Rs.)</Label>
                  <Input value={productPrice} onChange={e => setProductPrice(e.target.value)} />

                  <Label>Inventory Count</Label>
                  <Input value={productInventory} onChange={e => setProductInventory(e.target.value)} />

                  <Label>Availability Status</Label>
                  <Input value={productStatus} onChange={e => setProductStatus(e.target.value)} />

                  <Label>Benefits / Bullets</Label>
                  {benefits.map((b, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input value={b} onChange={e => { 
                        const newB = [...benefits]; 
                        newB[i] = e.target.value; 
                        setBenefits(newB); 
                      }} />
                      <Button onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))} variant="ghost" className="text-red-400">Remove</Button>
                    </div>
                  ))}
                  <Button onClick={() => setBenefits([...benefits, ""])} variant="ghost" className="text-gold text-[10px]">+ Add Benefit</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}