import React, { useState, useEffect } from 'react';
import { Product, Category, WebsiteSettings } from '../types';
import { store } from '../lib/store';
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
  Image as ImageIcon
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'whatsapp' | 'settings'>('dashboard');

  // Product Editing Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Category Editing Modal State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  // WhatsApp Number Form State
  const [whatsAppInput, setWhatsAppInput] = useState(settings.whatsAppNumber);

  // General Settings Form State
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...settings });

   useEffect(() => {
    setSettingsForm({ ...settings });
    setWhatsAppInput(settings.whatsAppNumber);
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

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.price) return;

    const newProd: Product = {
      id: editingProduct.id || crypto.randomUUID(),
      name: editingProduct.name,
      category: editingProduct.category || 'Indoor Plants',
      price: Number(editingProduct.price),
      images: editingProduct.images && editingProduct.images.length > 0
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="bg-[#F9F8F3] w-full max-w-7xl lg:max-w-[94vw] rounded-3xl shadow-2xl border border-[#1B3022]/20 my-6 overflow-hidden max-h-[94vh] flex flex-col text-[#1B3022]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-[#122116] text-[#F9F8F3] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-[#A3B18A]" />
            <h2 className="text-lg font-serif font-bold">PlantO Admin Dashboard</h2>
            {isAdmin && (
              <span className="bg-[#2D4F36] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[#A3B18A]">
                Authenticated
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="text-xs bg-white/10 hover:bg-rose-900/50 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full text-white"
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
                Enter your credentials to manage products, categories & WhatsApp settings.
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
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
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
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
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
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                <FolderTree className="w-4 h-4" />
                <span>Categories ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
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
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
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
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      Store Overview & Analytics
                    </h3>
                    <p className="text-xs text-[#1B3022]/60 mt-1">
                      Monitor catalog stats and WhatsApp order routing.
                    </p>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 shadow-sm">
                      <span className="text-xs uppercase font-bold text-[#2D4F36]">Total Products</span>
                      <span className="text-4xl font-serif font-extrabold text-[#1B3022] block mt-2">
                        {products.length}
                      </span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 shadow-sm">
                      <span className="text-xs uppercase font-bold text-[#2D4F36]">Active Categories</span>
                      <span className="text-4xl font-serif font-extrabold text-[#1B3022] block mt-2">
                        {categories.length}
                      </span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 shadow-sm">
                      <span className="text-xs uppercase font-bold text-[#2D4F36]">Target WhatsApp</span>
                      <span className="text-lg font-bold text-[#1B3022] block mt-2 font-mono">
                        +{settings.whatsAppNumber}
                      </span>
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 space-y-4">
                    <h4 className="text-sm font-serif font-bold text-[#1B3022]">
                      Recent Store Activity
                    </h4>
                    <ul className="space-y-3 text-xs text-[#1B3022]/80">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Monstera Deliciosa and 14 other products initialized in live database.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp click-to-chat active for +{settings.whatsAppNumber}.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>8 Landscaping service modules ready for user site enquiries.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                        Product Management
                      </h3>
                      <p className="text-xs text-[#1B3022]/60">
                        Add, edit or remove products from the PlantO storefront.
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingProduct({ name: '', price: 299, images: [] })}
                      className="px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl border border-[#1B3022]/10 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F1EFE7] uppercase text-[10px] font-extrabold text-[#1B3022]/70 border-b border-[#1B3022]/10">
                          <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Difficulty</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1B3022]/10">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-[#F9F8F3]">
                              <td className="p-4 flex items-center space-x-3">
                                <img
                                  src={p.images[0]}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover border"
                                />
                                <span className="font-bold text-[#1B3022]">{p.name}</span>
                              </td>
                              <td className="p-4 font-medium">{p.category}</td>
                              <td className="p-4 font-extrabold">₹{p.price}</td>
                              <td className="p-4">{p.careDifficulty}</td>
                              <td className="p-4">
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                  {p.availability}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onDeleteProduct(p.id)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
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

              {/* TAB 3: CATEGORY MANAGEMENT */}
              {activeTab === 'categories' && (
  <div className="space-y-6">

    {/* Category Header */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
          Category Management
        </h3>

        <p className="text-xs text-[#1B3022]/60">
          Manage product categories and group associations.
        </p>
      </div>

      {/* ADD CATEGORY BUTTON */}
      <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("ADD CATEGORY CLICKED");

    setEditingCategory({
      name: '',
      group: 'Plants',
      description: '',
      image: '',
    });
  }}
  className="relative z-10 px-4 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2 cursor-pointer shadow-sm pointer-events-auto"
>
  <Plus className="w-4 h-4" />
  <span>Add Category</span>
</button>
    </div>

    {/* CATEGORY LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {categories.map((c) => (
        <div
          key={c.id}
          className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 flex items-center justify-between"
        >

          <div className="flex items-center space-x-3">

            <img
              src={c.image}
              alt=""
              className="w-12 h-12 rounded-xl object-cover"
            />

            <div>
              <h4 className="text-xs font-bold text-[#1B3022]">
                {c.name}
              </h4>

              <span className="text-[10px] text-[#2D4F36] uppercase font-bold">
                {c.group}
              </span>
            </div>

          </div>

          {/* DELETE CATEGORY */}
          <button
            type="button"
            onClick={() => onDeleteCategory(c.id)}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>
      ))}

      {/* EMPTY STATE */}
      {categories.length === 0 && (
        <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-[#1B3022]/10">
          <FolderTree className="w-8 h-8 mx-auto mb-2 text-[#2D4F36]/50" />

          <p className="text-sm font-bold text-[#1B3022]">
            No categories yet
          </p>

          <p className="text-xs text-[#1B3022]/60 mt-1">
            Click "Add Category" to create your first category.
          </p>
        </div>
      )}

    </div>

  </div>
)}

{/* CATEGORY ADD / EDIT MODAL */}
{editingCategory && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">

    <div
      className="bg-[#F9F8F3] w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-[#1B3022]/20 space-y-5 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* MODAL HEADER */}
      <div className="flex items-center justify-between">

        <h3 className="text-xl font-serif font-bold text-[#1B3022]">
  {editingCategory.id ? 'Edit Category' : 'Add New Category'}
</h3>

        <button
          type="button"
          onClick={() => setEditingCategory(null)}
          className="p-2 hover:bg-[#1B3022]/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

      </div>

      {/* FORM */}
      <div className="space-y-4 text-xs">

        {/* CATEGORY NAME */}
        <div>
          <label className="block font-bold mb-1">
            Category Name *
          </label>

          <input
            type="text"
            required
            autoFocus
            placeholder="e.g. Indoor Plants"
            value={editingCategory.name || ''}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                name: e.target.value,
              })
            }
            className="w-full p-3 bg-white border border-[#1B3022]/15 rounded-xl focus:outline-none focus:border-[#2D4F36]"
          />
        </div>

        {/* GROUP */}
        <div>
          <label className="block font-bold mb-1">
            Group *
          </label>

          <select
            value={editingCategory.group || 'Plants'}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                group: e.target.value as 'Plants' | 'Other',
              })
            }
            className="w-full p-3 bg-white border border-[#1B3022]/15 rounded-xl focus:outline-none focus:border-[#2D4F36]"
          >
            <option value="Plants">
              Plants
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-bold mb-1">
            Description
          </label>

          <textarea
            rows={3}
            placeholder="Short description of this category"
            value={editingCategory.description || ''}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                description: e.target.value,
              })
            }
            className="w-full p-3 bg-white border border-[#1B3022]/15 rounded-xl focus:outline-none focus:border-[#2D4F36]"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block font-bold mb-1">
            Image URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            value={editingCategory.image || ''}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                image: e.target.value,
              })
            }
            className="w-full p-3 bg-white border border-[#1B3022]/15 rounded-xl focus:outline-none focus:border-[#2D4F36]"
          />
        </div>

      </div>

      {/* MODAL BUTTONS */}
      <div className="flex justify-end gap-3 pt-3">

        {/* CANCEL */}
        <button
          type="button"
          onClick={() => setEditingCategory(null)}
          className="px-5 py-2.5 border border-[#1B3022]/20 rounded-full font-bold hover:bg-[#1B3022]/5"
        >
          Cancel
        </button>

        {/* SAVE */}
        <button
          type="button"
          disabled={!editingCategory.name?.trim()}
          onClick={() => {

            if (!editingCategory.name?.trim()) {
              return;
            }

            const category: Category = {
              id:
                editingCategory.id ||
                `new-${crypto.randomUUID()}`,

              name: editingCategory.name.trim(),

              group:
                editingCategory.group || 'Plants',

              description:
                editingCategory.description || '',

              image:
                editingCategory.image || '',
            };

            onSaveCategory(category);

            setEditingCategory(null);
          }}
          className="px-6 py-2.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Category
          </span>
        </button>

      </div>

    </div>
  </div>
)}

              {/* TAB 4: WHATSAPP SETTINGS */}
              {activeTab === 'whatsapp' && (
                <div className="max-w-xl space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      WhatsApp Settings
                    </h3>
                    <p className="text-xs text-[#1B3022]/60">
                      Configure the business WhatsApp number that receives order checkouts.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                        Business WhatsApp Number (with Country Code, no + or spaces)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 919876543210"
                        value={whatsAppInput}
                        onChange={(e) => setWhatsAppInput(e.target.value)}
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-sm font-mono text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                      />
                      <span className="text-[11px] text-[#1B3022]/50 mt-1 block">
                        Example for India: <strong>919876543210</strong>
                      </span>
                    </div>

                    <button
                      onClick={handleSaveWhatsAppNumber}
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save WhatsApp Number</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: WEBSITE SETTINGS & NURSERY CONTACT INFO */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveWebsiteSettings} className="space-y-6 max-w-4xl">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1B3022]">
                      Nursery Contact Info & Website Settings
                    </h3>
                    <p className="text-xs text-[#1B3022]/60">
                      Update nursery contact details, address, working hours, logo, and slogans displayed across the website.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Nursery Contact Details Box */}
                    <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 space-y-4">
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
                          Physical Nursery Address
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

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          WhatsApp Order Routing Number
                        </label>
                        <input
                          type="text"
                          placeholder="919876543210"
                          value={settingsForm.whatsAppNumber || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, whatsAppNumber: e.target.value })
                          }
                          className="w-full bg-[#F9F8F3] p-2.5 rounded-xl border border-[#1B3022]/15 font-mono text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                        />
                      </div>
                    </div>

                    {/* Branding & Social Links Box */}
                    <div className="bg-white p-6 rounded-2xl border border-[#1B3022]/10 space-y-4">
                      <h4 className="text-sm font-serif font-bold text-[#2D4F36] pb-2 border-b border-[#1B3022]/10">
                        Logo & Branding Slogans
                      </h4>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                          Nursery Custom Logo (Supabase Storage upload)
                        </label>
                        <div className="space-y-2 bg-[#F9F8F3] p-3 rounded-xl border border-[#1B3022]/15">
                          {settingsForm.logoUrl && (
                            <div className="flex items-center space-x-3">
                              <img src={settingsForm.logoUrl} alt="Logo Preview" className="h-10 object-contain" />
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
                                  try { setSettingsForm({ ...settingsForm, logoUrl: await store.uploadProductImage(file) }); } catch { alert('Logo upload failed. Check your admin permissions.'); }
                                  }
                                }}
                              />
                            </label>
                            <span className="text-[10px] text-[#1B3022]/60">Upload replaces the current logo.</span>
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
                    {/* PNG / File Upload Button */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#1B3022] mb-1">
                        Option 1: Upload PNG / Image File
                      </label>
                      <label className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-[#2D4F36] text-white hover:bg-[#1B3022] rounded-xl cursor-pointer transition-colors text-xs font-bold shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Upload Local PNG / JPG</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try { setEditingProduct({ ...editingProduct, images: [await store.uploadProductImage(file)] }); } catch { alert('Image upload failed. Check your admin permissions.'); }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <p className="text-[10px] text-[#1B3022]/60 self-end">Images are stored in private-admin-managed Supabase Storage.</p>
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
                  className="px-4 py-2 border rounded-full font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2D4F36] text-white font-bold rounded-full"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
