import React, { useState, useEffect } from 'react';
import { Product, Category, WebsiteSettings, LandscapingService } from '../types';
import { store } from '../lib/store';
import { INITIAL_SERVICES } from '../data/initialData';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  MessageCircle,
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  Lock,
  LogOut,
  CheckCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Trees,
  Home,
  Building,
  Layers,
  Briefcase,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Loader2,
  Check,
  HeartHandshake
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (user: string, pass: string) => Promise<string | null>;
  onLogout: () => void;
  products: Product[];
  categories: Category[];
  settings: WebsiteSettings;
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onSaveCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateSettings: (newSettings: WebsiteSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  products,
  categories,
  settings,
  onSaveProduct,
  onDeleteProduct,
  onSaveCategory,
  onDeleteCategory,
  onUpdateSettings,
}) => {
  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active tab inside admin panel
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'landscaping' | 'about' | 'whatsapp' | 'settings'
  >('dashboard');

  // Product Editing Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Category Editing Modal State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  // Landscaping Services list state
  const [servicesList, setServicesList] = useState<LandscapingService[]>(
    settings.services && settings.services.length > 0 ? settings.services : INITIAL_SERVICES
  );

  // Landscaping Service Editing Modal State
  const [editingService, setEditingService] = useState<Partial<LandscapingService> | null>(null);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // About Us Key Point input state
  const [newPointInput, setNewPointInput] = useState('');

  // Image Uploading Loading State
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // WhatsApp Number Form State
  const [whatsAppInput, setWhatsAppInput] = useState(settings.whatsAppNumber);

  // General Settings Form State
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...settings });

  useEffect(() => {
    setSettingsForm({ ...settings });
    setWhatsAppInput(settings.whatsAppNumber);
    if (settings.services && settings.services.length > 0) {
      setServicesList(settings.services);
    }
  }, [settings]);

  if (!isOpen) return null;

  const handleLoginFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = await onLogin(usernameInput, passwordInput);
    if (errorMessage) {
      setLoginError(errorMessage);
    } else {
      setLoginError('');
    }
  };

  const handleUploadImageFile = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      const publicUrl = await store.uploadProductImage(file);
      return publicUrl;
    } catch (err: any) {
      alert(`Image upload failed: ${err?.message || 'Check storage bucket permissions in Supabase.'}`);
      throw err;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.price) return;

    const newProd: Product = {
      id: editingProduct.id || crypto.randomUUID(),
      name: editingProduct.name,
      category: editingProduct.category || 'Indoor Plants',
      price: Number(editingProduct.price),
      images:
        editingProduct.images && editingProduct.images.length > 0
          ? editingProduct.images
          : ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80'],
      shortDescription: editingProduct.shortDescription || '',
      description: editingProduct.description || '',
      careDifficulty: editingProduct.careDifficulty || 'Easy',
      availability: editingProduct.availability || 'In Stock',
      uses: editingProduct.uses || 'Decor',
      growingConditions: editingProduct.growingConditions || 'Indoors',
      sunlight: editingProduct.sunlight || 'Bright Indirect Light',
      watering: editingProduct.watering || 'Once a week',
      soilType: editingProduct.soilType || 'Potting mix',
      fertilizer: editingProduct.fertilizer || 'Organic vermicompost',
      growthTips: editingProduct.growthTips || 'Keep in well-ventilated space',
      maintenanceLevel: editingProduct.maintenanceLevel || 'Low',
      suitableClimate: editingProduct.suitableClimate || 'Tropical',
      plantSize: editingProduct.plantSize || 'Medium (1-2 ft)',
      featured: editingProduct.featured || false,
    };

    onSaveProduct(newProd);
    setEditingProduct(null);
  };

  const handleSaveCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name) return;

    const newCat: Category = {
      id: editingCategory.id || `new-${Date.now()}`,
      name: editingCategory.name,
      group: editingCategory.group || 'Plants',
      description: editingCategory.description || '',
      image:
        editingCategory.image ||
        'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    };

    onSaveCategory(newCat);
    setEditingCategory(null);
  };

  const handleSaveWhatsAppNumber = async () => {
    try {
      const updated = { ...settings, whatsAppNumber: whatsAppInput.trim() };
      await onUpdateSettings(updated);
      alert(`WhatsApp Business number updated successfully to: +${whatsAppInput.trim()}`);
    } catch (err: any) {
      alert(`Failed to update WhatsApp number: ${err?.message || 'Check your admin permissions.'}`);
    }
  };

  const handleSaveWebsiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdateSettings(settingsForm);
      alert('Website settings saved successfully!');
    } catch (err: any) {
      alert(`Failed to save website settings: ${err?.message || 'Check your admin permissions.'}`);
    }
  };

  // Landscaping Overview Save Handler
  const handleSaveLandscapingOverview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated: WebsiteSettings = {
        ...settingsForm,
        services: servicesList,
      };
      await onUpdateSettings(updated);
      alert('Landscaping & Gardening Works section saved successfully!');
    } catch (err: any) {
      alert(`Failed to save landscaping settings: ${err?.message || 'Check your admin permissions.'}`);
    }
  };

  // About Us Save Handler
  const handleSaveAboutUs = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdateSettings(settingsForm);
      alert('About Us section updated and saved successfully!');
    } catch (err: any) {
      alert(`Failed to save About Us content: ${err?.message || 'Check your admin permissions.'}`);
    }
  };

  // Service Card Save Handler
  const handleSaveServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    const newService: LandscapingService = {
      id:
        editingService.id ||
        `srv-${crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`,
      title: editingService.title.trim(),
      description: editingService.description || '',
      iconName: editingService.iconName || 'Trees',
      image:
        editingService.image ||
        'https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=800&q=80',
      features:
        editingService.features && editingService.features.length > 0
          ? editingService.features
          : ['Custom site survey', 'Drip irrigation design', 'Maintenance guarantee'],
    };

    let updatedList: LandscapingService[];
    if (servicesList.some((s) => s.id === newService.id)) {
      updatedList = servicesList.map((s) => (s.id === newService.id ? newService : s));
    } else {
      updatedList = [...servicesList, newService];
    }

    setServicesList(updatedList);
    setEditingService(null);
    setNewFeatureInput('');

    try {
      const updatedSettings: WebsiteSettings = {
        ...settingsForm,
        services: updatedList,
      };
      await onUpdateSettings(updatedSettings);
      alert(`Service "${newService.title}" saved successfully!`);
    } catch (err: any) {
      alert(`Failed to update service: ${err?.message || 'Check permissions.'}`);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this landscaping service card?')) return;
    const updatedList = servicesList.filter((s) => s.id !== serviceId);
    setServicesList(updatedList);

    try {
      const updatedSettings: WebsiteSettings = {
        ...settingsForm,
        services: updatedList,
      };
      await onUpdateSettings(updatedSettings);
      alert('Service deleted successfully.');
    } catch (err: any) {
      alert(`Failed to delete service: ${err?.message || 'Check permissions.'}`);
    }
  };

  const handleResetServicesToDefault = async () => {
    if (!window.confirm('Reset all landscaping services to the standard 8 turnkey services?')) return;
    setServicesList(INITIAL_SERVICES);
    try {
      const updatedSettings: WebsiteSettings = {
        ...settingsForm,
        services: INITIAL_SERVICES,
      };
      await onUpdateSettings(updatedSettings);
      alert('Reset to default 8 landscaping services.');
    } catch (err: any) {
      alert(`Failed to reset services: ${err?.message}`);
    }
  };

  const getServiceIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Building':
        return <Building className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Trees':
        return <Trees className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const availableIcons = [
    'Home',
    'Building',
    'Layers',
    'Briefcase',
    'ShieldCheck',
    'Sparkles',
    'Trees',
    'HelpCircle',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="bg-[#F9F8F3] w-full max-w-7xl lg:max-w-[94vw] rounded-3xl shadow-2xl border border-[#1B3022]/20 my-6 overflow-hidden max-h-[94vh] flex flex-col text-[#1B3022]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-[#122116] text-[#F9F8F3] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2D4F36] rounded-xl text-[#F9F8F3]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold tracking-wide">
                PlantO Admin Control Center
              </h2>
              <span className="text-[10px] text-[#A7F3D0] uppercase tracking-widest font-semibold block">
                {isAdmin ? 'Authenticated Administrator' : 'Authentication Required'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#F9F8F3] text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full text-[#F9F8F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          /* LOGIN FORM */
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto w-full space-y-6 text-center">
            <div className="w-16 h-16 bg-[#2D4F36]/10 text-[#2D4F36] rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                Admin Panel Login
              </h3>
              <p className="text-xs text-[#1B3022]/60 mt-1">
                Enter your credentials to manage products, categories, landscaping & WhatsApp settings.
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-100 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginFormSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Admin email
                </label>
                <input
                  type="text"
                  required
                  placeholder="you@example.com"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#1B3022]/20 text-xs focus:outline-none focus:border-[#2D4F36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="e.g. admin123"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#1B3022]/20 text-xs focus:outline-none focus:border-[#2D4F36]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-lg cursor-pointer"
                >
                  Sign In to Dashboard
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#1B3022]/50">
                  Sign in with the Supabase Auth account assigned to your team.
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD BODY */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F1EFE7] border-b md:border-b-0 md:border-r border-[#1B3022]/10 p-4 space-y-1 shrink-0">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Product Catalog ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'categories'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <FolderTree className="w-4 h-4" />
                <span>Categories ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('landscaping')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'landscaping'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <Trees className="w-4 h-4 text-[#2D4F36] group-hover:text-white" />
                <span>Landscaping & Works</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-[#2D4F36]" />
                <span>About Us Section</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Website Settings</span>
              </button>
            </div>

            {/* Content Body Area */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      PlantO Nursery Control Center
                    </h3>
                    <p className="text-xs text-[#1B3022]/60 mt-1">
                      Welcome back! Use the tabs on the left to manage live inventory, categories, landscaping works, and branding.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-[#1B3022]/10 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-[#2D4F36]">
                        <Package className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D4F36]/10 px-2 py-0.5 rounded-full">
                          Live
                        </span>
                      </div>
                      <h4 className="text-3xl font-serif font-bold text-[#1B3022]">
                        {products.length}
                      </h4>
                      <p className="text-xs text-[#1B3022]/70">Products in Catalog</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#1B3022]/10 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-[#2D4F36]">
                        <FolderTree className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D4F36]/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      </div>
                      <h4 className="text-3xl font-serif font-bold text-[#1B3022]">
                        {categories.length}
                      </h4>
                      <p className="text-xs text-[#1B3022]/70">Categories Configured</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#1B3022]/10 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-[#2D4F36]">
                        <Trees className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D4F36]/10 px-2 py-0.5 rounded-full">
                          Turnkey
                        </span>
                      </div>
                      <h4 className="text-3xl font-serif font-bold text-[#1B3022]">
                        {servicesList.length}
                      </h4>
                      <p className="text-xs text-[#1B3022]/70">Landscaping Services</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#1B3022]/10 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-[#25D366]">
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366]/10 text-[#128C7E] px-2 py-0.5 rounded-full">
                          Connected
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#1B3022] truncate">
                        +{settings.whatsAppNumber}
                      </h4>
                      <p className="text-xs text-[#1B3022]/70">WhatsApp Order Line</p>
                    </div>
                  </div>

                  {/* Quick Action Banner */}
                  <div className="bg-gradient-to-r from-[#2D4F36] to-[#1B3022] text-[#F9F8F3] p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center md:text-left">
                      <h4 className="text-lg font-serif font-bold">
                        Need to update Landscaping Works?
                      </h4>
                      <p className="text-xs text-[#F9F8F3]/80">
                        Add custom descriptions, upload showcase images, and manage gardening service cards in seconds.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('landscaping')}
                      className="px-5 py-2.5 bg-white text-[#1B3022] hover:bg-[#F9F8F3] rounded-full text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow cursor-pointer"
                    >
                      Manage Landscaping &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT CATALOG */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                        Product Catalog
                      </h3>
                      <p className="text-xs text-[#1B3022]/60 mt-1">
                        Manage your live plant and gardening supplies inventory.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingProduct({
                          name: '',
                          category: categories[0]?.name || 'Indoor Plants',
                          price: 299,
                          images: [],
                          shortDescription: '',
                          description: '',
                          careDifficulty: 'Easy',
                          availability: 'In Stock',
                          uses: 'Home Decor',
                          growingConditions: 'Indoors',
                          sunlight: 'Bright Indirect Light',
                          watering: 'Once a week',
                          soilType: 'Potting mix',
                          fertilizer: 'Vermicompost',
                          growthTips: 'Keep in airy spot',
                          maintenanceLevel: 'Low',
                          suitableClimate: 'Tropical',
                          plantSize: 'Medium (1-2 ft)',
                          featured: false,
                        })
                      }
                      className="px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Plant / Product</span>
                    </button>
                  </div>

                  {/* Product Table */}
                  <div className="bg-white rounded-2xl border border-[#1B3022]/10 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F1EFE7] text-[#1B3022] font-bold uppercase tracking-wider border-b border-[#1B3022]/10">
                          <tr>
                            <th className="p-3.5">Product</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1B3022]/10">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-[#F9F8F3] transition-colors">
                              <td className="p-3.5 flex items-center space-x-3">
                                <img
                                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=150&q=80'}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-[#1B3022]/10 shrink-0"
                                />
                                <div>
                                  <span className="font-bold text-[#1B3022] block">{p.name}</span>
                                  <span className="text-[10px] text-[#1B3022]/50 truncate max-w-xs block">
                                    {p.shortDescription}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3.5 text-[#1B3022]/80">{p.category}</td>
                              <td className="p-3.5 font-bold text-[#2D4F36]">₹{p.price}</td>
                              <td className="p-3.5">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    p.availability === 'In Stock'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {p.availability}
                                </span>
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1.5 text-[#2D4F36] hover:bg-[#2D4F36]/10 rounded-lg transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onDeleteProduct(p.id)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                        Store Categories
                      </h3>
                      <p className="text-xs text-[#1B3022]/60 mt-1">
                        Organize your catalog into Plants, Pots, Fertilizers & Tools.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingCategory({
                          name: '',
                          group: 'Plants',
                          description: '',
                          image: '',
                        })
                      }
                      className="px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Category</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 shadow-sm flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={cat.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=150&q=80'}
                            alt={cat.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#1B3022]/10 shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                              {cat.group}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-[#1B3022] truncate">
                              {cat.name}
                            </h4>
                            <p className="text-[10px] text-[#1B3022]/60 truncate max-w-xs">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0 ml-2">
                          <button
                            onClick={() => setEditingCategory(cat)}
                            className="p-1.5 text-[#2D4F36] hover:bg-[#2D4F36]/10 rounded-lg cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory(cat.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LANDSCAPING & GARDENING WORKS (NEW) */}
              {activeTab === 'landscaping' && (
                <div className="space-y-8">
                  {/* Top Title & Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1B3022]/10">
                    <div>
                      <div className="flex items-center space-x-2 text-[#2D4F36] mb-1">
                        <Trees className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Turnkey Landscape Management
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                        Landscaping & Gardening Works
                      </h3>
                      <p className="text-xs text-[#1B3022]/65 mt-0.5">
                        Manage section descriptions, upload/replace showcase images, and modify service cards.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleResetServicesToDefault}
                        className="px-3 py-2 border border-[#1B3022]/20 hover:bg-[#1B3022]/5 text-[#1B3022] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        title="Reset services list to default 8 cards"
                      >
                        Reset Defaults
                      </button>
                      <button
                        onClick={() =>
                          setEditingService({
                            title: '',
                            description: '',
                            iconName: 'Trees',
                            image: '',
                            features: ['Site inspection & soil test', 'Automated drip irrigation', 'Ongoing maintenance warranty'],
                          })
                        }
                        className="px-4 py-2 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Service</span>
                      </button>
                    </div>
                  </div>

                  {/* Section Overview & Showcase Image Form */}
                  <form
                    onSubmit={handleSaveLandscapingOverview}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-6"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#1B3022]/10">
                      <div>
                        <h4 className="text-base font-serif font-bold text-[#2D4F36]">
                          Section Overview & Media Banner
                        </h4>
                        <p className="text-xs text-[#1B3022]/60">
                          This content appears directly at the top of the Landscaping & Gardening Works section.
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Section Info</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Section Tagline / Category Subtitle
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Professional Turnkey Services"
                          value={settingsForm.landscapingTagline || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, landscapingTagline: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Landscaping & Gardening Works"
                          value={settingsForm.landscapingTitle || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, landscapingTitle: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>
                    </div>

                    {/* Section Description Textarea */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                        Section Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Write a compelling overview of your nursery's landscaping services, residential gardens, and turnkey project capabilities..."
                        value={settingsForm.landscapingDescription || ''}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, landscapingDescription: e.target.value })
                        }
                        className="w-full bg-[#F9F8F3] p-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36] leading-relaxed"
                      ></textarea>
                      <span className="text-[10px] text-[#1B3022]/60 mt-1 block">
                        This description is displayed prominently under the main heading on the homepage.
                      </span>
                    </div>

                    {/* Section Showcase Image Upload */}
                    <div className="space-y-3 pt-2 border-t border-[#1B3022]/10">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022]">
                        Section Showcase / Featured Landscape Image
                      </label>

                      {/* Image Preview if Present */}
                      {settingsForm.landscapingImage ? (
                        <div className="relative rounded-2xl overflow-hidden border border-[#1B3022]/15 bg-[#1B3022] aspect-[21/8] max-h-48 group">
                          <img
                            src={settingsForm.landscapingImage}
                            alt="Showcase Preview"
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-4 text-white">
                            <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                              Active Showcase Image
                            </span>
                            <div className="flex items-center space-x-2">
                              <label className="px-3 py-1.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow">
                                <span>Replace Image</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/webp"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await handleUploadImageFile(file);
                                      setSettingsForm({ ...settingsForm, landscapingImage: url });
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setSettingsForm({ ...settingsForm, landscapingImage: '' })}
                                className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 border-2 border-dashed border-[#1B3022]/20 rounded-2xl bg-[#F9F8F3] text-center space-y-3">
                          <ImageIcon className="w-8 h-8 text-[#2D4F36]/60 mx-auto" />
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-[#1B3022]">
                              No showcase banner image configured
                            </p>
                            <p className="text-[11px] text-[#1B3022]/60">
                              Upload a high-resolution landscape photo to showcase your turnkey projects.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Image Upload Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-sm">
                            {isUploadingImage ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Uploading to Supabase Storage...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Upload Image File (PNG / JPG / WebP)</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              className="hidden"
                              disabled={isUploadingImage}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleUploadImageFile(file);
                                  setSettingsForm({ ...settingsForm, landscapingImage: url });
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <input
                            type="url"
                            placeholder="Or paste an image web URL (https://...)"
                            value={settingsForm.landscapingImage || ''}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, landscapingImage: e.target.value })
                            }
                            className="w-full bg-[#F9F8F3] px-3 py-2 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                          />
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Landscaping Services Cards Management Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-serif font-bold text-[#1B3022]">
                          Landscaping & Gardening Service Offerings ({servicesList.length})
                        </h4>
                        <p className="text-xs text-[#1B3022]/60">
                          Edit or add individual service cards with custom photos, icons, and bullet features.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {servicesList.map((service) => (
                        <div
                          key={service.id}
                          className="bg-white rounded-2xl border border-[#1B3022]/10 overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#2D4F36]/30 transition-all"
                        >
                          <div>
                            {/* Card Image Thumbnail */}
                            <div className="relative aspect-[16/10] bg-[#F1EFE7] overflow-hidden">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2 p-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[#2D4F36] shadow-sm border border-[#1B3022]/10">
                                {getServiceIconComponent(service.iconName)}
                              </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-4 space-y-2">
                              <h5 className="font-serif font-bold text-base text-[#1B3022]">
                                {service.title}
                              </h5>
                              <p className="text-xs text-[#1B3022]/70 line-clamp-2">
                                {service.description}
                              </p>

                              <div className="pt-2 flex flex-wrap gap-1">
                                {service.features?.slice(0, 2).map((feat, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1EFE7] text-[#1B3022]/80"
                                  >
                                    {feat}
                                  </span>
                                ))}
                                {service.features?.length > 2 && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-[#2D4F36]">
                                    +{service.features.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="p-4 pt-0 flex items-center justify-between border-t border-[#1B3022]/10 mt-3 pt-3">
                            <button
                              onClick={() => setEditingService(service)}
                              className="px-3 py-1.5 bg-[#F1EFE7] hover:bg-[#2D4F36] text-[#1B3022] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit Service</span>
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete service card"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ABOUT US SECTION MANAGEMENT */}
              {activeTab === 'about' && (
                <form onSubmit={handleSaveAboutUs} className="space-y-8">
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1B3022]/10">
                    <div>
                      <div className="flex items-center space-x-2 text-[#2D4F36] mb-1">
                        <HeartHandshake className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          About Us & Heritage Content
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                        About Us Section Management
                      </h3>
                      <p className="text-xs text-[#1B3022]/65 mt-0.5">
                        Edit your nursery's mission statement, extended story, core values, and upload or replace the section photo.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save About Us Content</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Photo & Badge Management */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-4">
                        <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                          About Us Section Photo
                        </h4>

                        {/* Image Preview */}
                        {settingsForm.aboutUsImage ? (
                          <div className="relative rounded-2xl overflow-hidden border border-[#1B3022]/15 bg-[#1B3022] aspect-[4/5] group">
                            <img
                              src={settingsForm.aboutUsImage}
                              alt="About Us Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 text-white">
                              <label className="px-3 py-2 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow">
                                <span>Replace Photo</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/webp"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await handleUploadImageFile(file);
                                      setSettingsForm({ ...settingsForm, aboutUsImage: url });
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setSettingsForm({ ...settingsForm, aboutUsImage: '' })}
                                className="px-3 py-2 bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 border-2 border-dashed border-[#1B3022]/20 rounded-2xl bg-[#F9F8F3] text-center space-y-3 aspect-[4/5] flex flex-col items-center justify-center">
                            <ImageIcon className="w-10 h-10 text-[#2D4F36]/50 mx-auto" />
                            <p className="text-xs font-bold text-[#1B3022]">
                              No custom photo uploaded yet
                            </p>
                            <p className="text-[11px] text-[#1B3022]/60 max-w-[200px]">
                              Upload a portrait/nursery photo showcasing your green garden.
                            </p>
                          </div>
                        )}

                        {/* Upload Actions */}
                        <div className="space-y-3 pt-2">
                          <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-sm w-full">
                            {isUploadingImage ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Uploading to Supabase...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Upload Photo (PNG/JPG/WebP)</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              className="hidden"
                              disabled={isUploadingImage}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleUploadImageFile(file);
                                  setSettingsForm({ ...settingsForm, aboutUsImage: url });
                                }
                              }}
                            />
                          </label>

                          <input
                            type="url"
                            placeholder="Or paste image web link (https://...)"
                            value={settingsForm.aboutUsImage || ''}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, aboutUsImage: e.target.value })
                            }
                            className="w-full bg-[#F9F8F3] px-3 py-2 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                          />
                        </div>

                        {/* Photo Established Badge */}
                        <div className="pt-2 border-t border-[#1B3022]/10">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                            Established Year / Photo Badge
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Established 2011"
                            value={settingsForm.aboutUsEstablished || ''}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, aboutUsEstablished: e.target.value })
                            }
                            className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Mission, Story & Points */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-5">
                        <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                          Section Headings & Content
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                              Section Tagline / Subtitle
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Our Mission & Heritage"
                              value={settingsForm.aboutUsTagline || ''}
                              onChange={(e) =>
                                setSettingsForm({ ...settingsForm, aboutUsTagline: e.target.value })
                              }
                              className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                              Section Main Title
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. About PlantO Nursery"
                              value={settingsForm.aboutUsTitle || ''}
                              onChange={(e) =>
                                setSettingsForm({ ...settingsForm, aboutUsTitle: e.target.value })
                              }
                              className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                            />
                          </div>
                        </div>

                        {/* Mission Statement */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                            Primary Mission Statement *
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder="State your nursery's primary mission and botanical commitment..."
                            value={settingsForm.aboutUsMission || ''}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, aboutUsMission: e.target.value })
                            }
                            className="w-full bg-[#F9F8F3] p-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36] leading-relaxed"
                          ></textarea>
                        </div>

                        {/* Extended Story / Paragraph */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                            Extended Nursery Story / Detailed Background
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Share more about your nursery history, organic plant care philosophy, landscaping team, and greenhouse facilities..."
                            value={settingsForm.aboutUsStory || ''}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, aboutUsStory: e.target.value })
                            }
                            className="w-full bg-[#F9F8F3] p-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36] leading-relaxed"
                          ></textarea>
                        </div>

                        {/* Key Highlights / Values Tags */}
                        <div className="space-y-3 pt-2 border-t border-[#1B3022]/10">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022]">
                            Core Values & Highlights (Bullet Points)
                          </label>

                          <div className="space-y-2 bg-[#F1EFE7] p-4 rounded-2xl border border-[#1B3022]/15">
                            <div className="flex flex-wrap gap-2">
                              {(settingsForm.aboutUsPoints || []).map((point, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#1B3022]/10 rounded-full text-xs text-[#1B3022] shadow-sm"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#2D4F36]" />
                                  <span>{point}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (settingsForm.aboutUsPoints || []).filter(
                                        (_, i) => i !== idx
                                      );
                                      setSettingsForm({ ...settingsForm, aboutUsPoints: updated });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                                  >
                                    &times;
                                  </button>
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                              <input
                                type="text"
                                placeholder="e.g. 100% Acclimatized & Pest-Free Plants"
                                value={newPointInput}
                                onChange={(e) => setNewPointInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (newPointInput.trim()) {
                                      const current = settingsForm.aboutUsPoints || [];
                                      setSettingsForm({
                                        ...settingsForm,
                                        aboutUsPoints: [...current, newPointInput.trim()],
                                      });
                                      setNewPointInput('');
                                    }
                                  }
                                }}
                                className="flex-1 p-2 bg-white border border-[#1B3022]/20 rounded-xl text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newPointInput.trim()) {
                                    const current = settingsForm.aboutUsPoints || [];
                                    setSettingsForm({
                                      ...settingsForm,
                                      aboutUsPoints: [...current, newPointInput.trim()],
                                    });
                                    setNewPointInput('');
                                  }
                                }}
                                className="px-4 py-2 bg-[#2D4F36] hover:bg-[#1B3022] text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm"
                              >
                                + Add Highlight
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full py-3.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save All About Us Content</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 5: WHATSAPP SETTINGS */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      WhatsApp Direct Order Routing
                    </h3>
                    <p className="text-xs text-[#1B3022]/60 mt-1">
                      All storefront checkouts and gardening enquiries dispatch directly to this number.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-4">
                    <div className="flex items-center space-x-3 text-[#25D366] pb-3 border-b border-[#1B3022]/10">
                      <MessageCircle className="w-6 h-6 fill-current" />
                      <span className="font-bold text-sm text-[#1B3022]">
                        Business WhatsApp Configuration
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                        Active WhatsApp Number (Include Country Code, No + or spaces)
                      </label>
                      <input
                        type="text"
                        value={whatsAppInput}
                        onChange={(e) => setWhatsAppInput(e.target.value)}
                        placeholder="e.g. 919876543210"
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/20 font-mono text-sm text-[#1B3022] focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleSaveWhatsAppNumber}
                        className="px-6 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-md cursor-pointer flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update WhatsApp Number</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: WEBSITE SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveWebsiteSettings} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      Nursery Profile & Branding
                    </h3>
                    <p className="text-xs text-[#1B3022]/60 mt-1">
                      Manage official logo, business address, and multi-language nursery slogans.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-4">
                      <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                        Nursery Contact Information
                      </h4>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Nursery Name / Company Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.companyName || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, companyName: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Contact Phone Number
                        </label>
                        <input
                          type="text"
                          placeholder="+91 98765 43210"
                          value={settingsForm.contactPhone || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, contactPhone: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Nursery Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="care@planto.in"
                          value={settingsForm.contactEmail || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, contactEmail: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Physical Nursery Address (Linked to Google Maps)
                        </label>
                        <textarea
                          rows={2}
                          value={settingsForm.contactAddress || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, contactAddress: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Working Hours
                        </label>
                        <input
                          type="text"
                          placeholder="Monday - Sunday: 8:00 AM - 8:00 PM"
                          value={settingsForm.workingHours || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, workingHours: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>
                    </div>

                    {/* Social Media & Profiles */}
                    <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-4">
                      <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                        Social Media & Profiles
                      </h4>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Instagram Profile Link
                        </label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/plant_o_nursery"
                          value={settingsForm.instagramUrl || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Facebook Page Link
                        </label>
                        <input
                          type="url"
                          placeholder="https://facebook.com/plantonursery"
                          value={settingsForm.facebookUrl || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>
                    </div>

                    {/* Branding & Logo */}
                    <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-4">
                      <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                        Visual Identity & Typography
                      </h4>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Custom Logo (Upload PNG/SVG to Supabase)
                        </label>
                        <div className="space-y-2 bg-[#F9F8F3] p-3 rounded-xl border border-[#1B3022]/15">
                          {settingsForm.logoUrl && (
                            <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-[#1B3022]/10">
                              <img
                                src={settingsForm.logoUrl}
                                alt="Custom Logo"
                                className="h-10 w-auto object-contain"
                              />
                              <button
                                type="button"
                                onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                                className="text-xs text-rose-600 hover:underline font-bold"
                              >
                                Remove Custom Logo
                              </button>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-1.5 bg-[#2D4F36] text-white rounded-lg cursor-pointer hover:bg-[#1B3022] text-[11px] font-bold flex items-center space-x-1 shrink-0">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload PNG Logo</span>
                              <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const url = await handleUploadImageFile(file);
                                      setSettingsForm({ ...settingsForm, logoUrl: url });
                                    } catch {
                                      // error alert handled in helper
                                    }
                                  }
                                }}
                              />
                            </label>
                            <span className="text-[10px] text-[#1B3022]/60">Upload replaces current logo.</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          English Slogan
                        </label>
                        <input
                          type="text"
                          value={settingsForm.sloganEnglish || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, sloganEnglish: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Hindi Slogan
                        </label>
                        <input
                          type="text"
                          value={settingsForm.sloganHindi || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, sloganHindi: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Telugu Slogan
                        </label>
                        <input
                          type="text"
                          value={settingsForm.sloganTelugu || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, sloganTelugu: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Hero Tagline
                        </label>
                        <input
                          type="text"
                          value={settingsForm.heroTagline || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, heroTagline: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          About Us Mission Text
                        </label>
                        <textarea
                          rows={2}
                          value={settingsForm.aboutUsMission || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, aboutUsMission: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white font-extrabold uppercase tracking-widest rounded-full transition-colors shadow-lg cursor-pointer flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Nursery & Website Settings</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#F9F8F3] w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-[#1B3022]/20 max-h-[85vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#1B3022]">
              {editingProduct.id ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2.5 bg-white border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'Indoor Plants'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2.5 bg-white border rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1.5">Product Image (Supabase Storage upload)</label>
                <div className="space-y-3 bg-[#F1EFE7] p-4 rounded-2xl border border-[#1B3022]/15">
                  {/* Image Preview Thumbnail */}
                  {editingProduct.images && editingProduct.images[0] ? (
                    <div className="flex items-center space-x-4 bg-white p-2.5 rounded-xl border border-[#1B3022]/10">
                      <img
                        src={editingProduct.images[0]}
                        alt="Product Preview"
                        className="w-16 h-16 rounded-lg object-cover border border-[#1B3022]/20 shadow-sm shrink-0"
                      />
                      <div className="space-y-1 overflow-hidden">
                        <span className="text-[11px] font-bold text-[#2D4F36] block">Image Loaded</span>
                        <p className="text-[10px] text-[#1B3022]/60 truncate max-w-xs">{editingProduct.images[0]}</p>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, images: [] })}
                          className="text-xs text-rose-600 hover:underline font-bold block"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#1B3022]/60 italic bg-white p-2.5 rounded-xl border border-[#1B3022]/10 text-center">
                      No image uploaded yet. Choose a PNG/JPG/WebP file below.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#1B3022] mb-1">
                        Upload Image File
                      </label>
                      <label className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-[#2D4F36] text-white hover:bg-[#1B3022] rounded-xl cursor-pointer transition-colors text-xs font-bold shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Choose Local PNG / JPG</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const url = await handleUploadImageFile(file);
                                setEditingProduct({ ...editingProduct, images: [url] });
                              } catch {
                                // Handled in helper
                              }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#1B3022] mb-1">
                        Or Paste Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={editingProduct.images?.[0] || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                        className="w-full p-2.5 bg-white border rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-white border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border rounded-full font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2D4F36] text-white font-bold rounded-full cursor-pointer shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#F9F8F3] w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-[#1B3022]/20 max-h-[85vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#1B3022]">
              {editingCategory.id ? 'Edit Category' : 'Add New Category'}
            </h3>

            <form onSubmit={handleSaveCategorySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exotic Ferns"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full p-2.5 bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Category Group</label>
                <select
                  value={editingCategory.group || 'Plants'}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      group: e.target.value as 'Plants' | 'Other',
                    })
                  }
                  className="w-full p-2.5 bg-white border rounded-xl"
                >
                  <option value="Plants">Plants Group</option>
                  <option value="Other">Other Gardening Products</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Category Image</label>
                <div className="space-y-2 bg-[#F1EFE7] p-3 rounded-xl border border-[#1B3022]/15">
                  {editingCategory.image && (
                    <img
                      src={editingCategory.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  )}
                  <label className="flex items-center justify-center space-x-2 px-3 py-2 bg-[#2D4F36] text-white rounded-xl cursor-pointer text-xs font-bold">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadImageFile(file);
                          setEditingCategory({ ...editingCategory, image: url });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  className="w-full p-2.5 bg-white border rounded-xl"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 border rounded-full font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2D4F36] text-white font-bold rounded-full cursor-pointer shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / CREATE LANDSCAPING SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F9F8F3] w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-[#1B3022]/20 max-h-[90vh] overflow-y-auto space-y-5 text-[#1B3022]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B3022]/10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#2D4F36]/10 text-[#2D4F36] rounded-xl">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1B3022]">
                    {editingService.id ? 'Edit Landscaping Service' : 'Add New Landscaping Service'}
                  </h3>
                  <span className="text-[10px] text-[#1B3022]/60 uppercase tracking-wider font-semibold">
                    Turnkey Gardening Offering
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-2 hover:bg-[#1B3022]/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveServiceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Terrace Garden Development"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#1B3022]/20 rounded-xl focus:outline-none focus:border-[#2D4F36]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what this turnkey landscape offering includes, ideal spaces, and benefits..."
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full p-2.5 bg-white border border-[#1B3022]/20 rounded-xl focus:outline-none focus:border-[#2D4F36]"
                ></textarea>
              </div>

              {/* Service Card Image Upload & Replace */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Service Card Image *
                </label>
                <div className="space-y-3 bg-[#F1EFE7] p-4 rounded-2xl border border-[#1B3022]/15">
                  {editingService.image ? (
                    <div className="flex items-center space-x-4 bg-white p-3 rounded-xl border border-[#1B3022]/10">
                      <img
                        src={editingService.image}
                        alt="Service Preview"
                        className="w-20 h-16 rounded-lg object-cover border border-[#1B3022]/20 shadow-sm shrink-0"
                      />
                      <div className="space-y-1 overflow-hidden flex-1">
                        <span className="text-[11px] font-bold text-[#2D4F36] block">
                          Current Service Photo
                        </span>
                        <p className="text-[10px] text-[#1B3022]/60 truncate">{editingService.image}</p>
                        <button
                          type="button"
                          onClick={() => setEditingService({ ...editingService, image: '' })}
                          className="text-xs text-rose-600 hover:underline font-bold block cursor-pointer"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#1B3022]/60 italic bg-white p-3 rounded-xl border border-[#1B3022]/10 text-center">
                      No service photo uploaded yet. Choose a file below or paste a photo link.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white rounded-xl cursor-pointer text-xs font-bold shadow-sm transition-colors">
                        {isUploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Upload PNG / JPG File</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          disabled={isUploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUploadImageFile(file);
                              setEditingService({ ...editingService, image: url });
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <input
                        type="url"
                        placeholder="Or paste image URL (https://...)"
                        value={editingService.image || ''}
                        onChange={(e) =>
                          setEditingService({ ...editingService, image: e.target.value })
                        }
                        className="w-full p-2.5 bg-white border border-[#1B3022]/20 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                  Select Card Icon
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-[#F1EFE7] p-3 rounded-2xl border border-[#1B3022]/15">
                  {availableIcons.map((iconName) => (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setEditingService({ ...editingService, iconName })}
                      className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        editingService.iconName === iconName
                          ? 'bg-[#2D4F36] text-white shadow-md'
                          : 'bg-white text-[#1B3022] hover:bg-[#1B3022]/10 border border-[#1B3022]/10'
                      }`}
                    >
                      {getServiceIconComponent(iconName)}
                      <span className="text-[9px] font-semibold truncate max-w-full">
                        {iconName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Features Bullet Points */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Key Service Features & Highlights
                </label>
                <div className="space-y-2 bg-[#F1EFE7] p-3 rounded-2xl border border-[#1B3022]/15">
                  <div className="flex flex-wrap gap-1.5">
                    {editingService.features?.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#1B3022]/10 rounded-full text-xs text-[#1B3022] shadow-sm"
                      >
                        <Check className="w-3 h-3 text-[#2D4F36]" />
                        <span>{feat}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingService.features?.filter((_, i) => i !== idx);
                            setEditingService({ ...editingService, features: updated });
                          }}
                          className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Feature Point Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="e.g. Free 3-month plant replacement guarantee"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newFeatureInput.trim()) {
                            const current = editingService.features || [];
                            setEditingService({
                              ...editingService,
                              features: [...current, newFeatureInput.trim()],
                            });
                            setNewFeatureInput('');
                          }
                        }
                      }}
                      className="flex-1 p-2 bg-white border border-[#1B3022]/20 rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureInput.trim()) {
                          const current = editingService.features || [];
                          setEditingService({
                            ...editingService,
                            features: [...current, newFeatureInput.trim()],
                          });
                          setNewFeatureInput('');
                        }
                      }}
                      className="px-3 py-2 bg-[#2D4F36] hover:bg-[#1B3022] text-white rounded-xl font-bold text-xs cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-[#1B3022]/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 border border-[#1B3022]/20 rounded-full font-bold text-xs hover:bg-[#1B3022]/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md cursor-pointer transition-colors"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
