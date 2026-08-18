import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, WebsiteSettings } from './types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
} from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AboutUsSection } from './components/AboutUsSection';
import { LandscapingSection } from './components/LandscapingSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { BackToTop } from './components/BackToTop';
import { CheckCircle2, X } from 'lucide-react';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { store } from './lib/store';

export default function App() {
  // Store settings initialize from local cache if present, syncing with Supabase
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const cached = localStorage.getItem('planto_settings');
      if (cached) {
        return { ...INITIAL_SETTINGS, ...JSON.parse(cached) };
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_SETTINGS;
  });
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('planto_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(() =>
    new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery'
  );
  const [isRecoverySessionReady, setIsRecoverySessionReady] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordResetMessage, setPasswordResetMessage] = useState<string | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart is intentionally local: it is a convenience state, not a database.
  useEffect(() => {
    localStorage.setItem('planto_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const recoveryParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = recoveryParams.get('access_token');
    const refreshToken = recoveryParams.get('refresh_token');
    if (recoveryParams.get('type') === 'recovery' && accessToken && refreshToken) {
      void supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
        if (error) setPasswordResetMessage('This recovery link is invalid or expired. Request a new one.');
        else setIsRecoverySessionReady(true);
      });
    }
    const load = async () => {
      try {
        const data = await store.loadCatalog();
        setProducts(data.products);
        setCategories(data.categories);
        if (data.settings) {
          setSettings(data.settings);
          try {
            localStorage.setItem('planto_settings', JSON.stringify(data.settings));
          } catch {
            // ignore
          }
        }
      } catch (error) { console.error('Unable to load PlantO catalog', error); triggerToast('Unable to load the latest catalog.'); }
    };
    void load();
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(Boolean(session));
      if (event === 'PASSWORD_RECOVERY') { setIsPasswordRecovery(true); setIsRecoverySessionReady(Boolean(session)); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    const validQty = Math.max(1, Math.min(99, quantity));
    let finalAddedQty = validQty;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        const newQty = Math.min(99, currentQty + validQty);
        finalAddedQty = newQty - currentQty;
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        return [...prev, { product, quantity: validQty }];
      }
    });

    if (finalAddedQty > 0) {
      triggerToast(`Added ${finalAddedQty}x "${product.name}" to cart! 🌿`);
    } else {
      triggerToast(`Maximum quantity of 99 reached for "${product.name}".`);
    }
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    const clampedQty = Math.min(99, newQuantity);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: clampedQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBuyWhatsAppDirect = (product: Product, quantity = 1) => {
    const text = `Hello PlantO,

I am interested in buying:
• ${product.name} × ${quantity} (₹${product.price * quantity})

Category: ${product.category}
Plant Size: ${product.plantSize}

Please confirm availability and delivery details.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${encoded}`, '_blank');
  };

  // Admin authentication
  const handleAdminLogin = async (email: string, password: string) => {
    if (!supabase) return 'Supabase is not configured in .env.local.';
    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    if (authData.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', authData.user.id)
        .maybeSingle();
      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        return 'Signed in, but this user is not an approved PlantO admin.';
      }
    }
    return null;
  };

  const handleAdminLogout = () => { void supabase?.auth.signOut(); setIsAdmin(false); };

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || newPassword.length < 8) {
      setPasswordResetMessage('Use at least 8 characters.');
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setPasswordResetMessage('No valid recovery session was found. Request a new email link and open it only once.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { setPasswordResetMessage(error.message); return; }
    setPasswordResetMessage('Password updated. You can now sign in to the admin dashboard.');
    setNewPassword('');
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // Admin Data Management
  const handleSaveProduct = async (product: Product) => {
    try {
      const saved = await store.saveProduct(product);
      setProducts((prev) => prev.some((p) => p.id === saved.id) ? prev.map((p) => p.id === saved.id ? saved : p) : [saved, ...prev]);
      triggerToast(`Product "${saved.name}" saved!`);
    } catch (err: any) {
      console.error('saveProduct failed', err);
      triggerToast(err?.message || 'Failed to save product');
      throw err;
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await store.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      triggerToast('Product removed.');
    } catch (err: any) {
      console.error('deleteProduct failed', err);
      triggerToast(err?.message || 'Failed to delete product');
      throw err;
    }
  };

  const handleSaveCategory = async (category: Category) => {
    try {
      const saved = await store.saveCategory(category);
      setCategories((prev) => prev.some((c) => c.id === saved.id) ? prev.map((c) => c.id === saved.id ? saved : c) : [...prev, saved]);
      triggerToast(`Category "${saved.name}" saved!`);
      return saved;
    } catch (err: any) {
      console.error('saveCategory failed', err);
      triggerToast(err?.message || 'Failed to save category');
      throw err;
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await store.deleteCategory(categoryId);
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      triggerToast('Category removed.');
    } catch (err: any) {
      console.error('deleteCategory failed', err);
      triggerToast(err?.message || 'Failed to delete category');
      throw err;
    }
  };

  const handleUpdateSettings = async (newSettings: WebsiteSettings) => {
    try {
      await store.saveSettings(newSettings);
      setSettings(newSettings);
      try {
        localStorage.setItem('planto_settings', JSON.stringify(newSettings));
      } catch {
        // ignore
      }
      triggerToast('Website settings updated!');
    } catch (err: any) {
      console.error('updateSettings failed', err);
      triggerToast(err?.message || 'Failed to update website settings');
      throw err;
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1B3022] font-sans relative flex flex-col selection:bg-[#2D4F36] selection:text-white">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#2D4F36] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#A3B18A]" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-white/10 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Sticky Header */}
      <Header
        settings={settings}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => {
          const el = document.querySelector('#products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        isAdmin={isAdmin}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Main Body View */}
      <main className="flex-1">
        {/* Landing Page Hero Section */}
        <Hero
          settings={settings}
          onShopNow={() => {
            setSelectedCategory('All');
            const el = document.querySelector('#products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExplorePlants={() => {
            setSelectedCategory('Plants');
            const el = document.querySelector('#products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactUs={() => {
            const el = document.querySelector('#contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Catalog Section */}
        <ProductCatalog
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onViewDetails={(product) => setSelectedProductForModal(product)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Landscaping & Gardening Works Section */}
        <LandscapingSection
          settings={settings}
          onEnquireService={(service) => {
            // Service modal handled in component
          }}
        />

        {/* About Us Section with Animated Counters */}
        <AboutUsSection settings={settings} />

        {/* Contact Section */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyWhatsApp={(p, qty) => handleBuyWhatsAppDirect(p, qty)}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
      />

      {/* Cart Drawer & WhatsApp Checkout */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
        onCheckout={async ({ customerName, phone, address }) =>
          store.createOrder({
            customerName,
            phone,
            address,
            items: cartItems,
            totalAmount: cartItems.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ),
          })
        }
      />

      {/* Secure Admin Panel */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        products={products}
        categories={categories}
        settings={settings}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Floating Back To Top & WhatsApp Widget */}
      <BackToTop whatsAppNumber={settings.whatsAppNumber} />

      {isPasswordRecovery && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4">
          <form onSubmit={handlePasswordReset} className="w-full max-w-md rounded-3xl bg-[#F9F8F3] p-8 shadow-2xl">
            <h2 className="text-2xl font-serif font-bold">Set a new password</h2>
            <p className="mt-2 text-sm text-[#1B3022]/65">Choose a new password for your PlantO admin account.</p>
            <label className="mt-6 block text-xs font-bold uppercase tracking-wide">New password</label>
            <input type="password" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#1B3022]/20 bg-white px-4 py-3" />
            {passwordResetMessage && <p className="mt-3 text-sm text-[#2D4F36]">{passwordResetMessage}</p>}
            <button type="submit" disabled={!isRecoverySessionReady} className="mt-6 w-full rounded-full bg-[#2D4F36] py-3 text-xs font-bold uppercase tracking-widest text-white disabled:cursor-not-allowed disabled:opacity-50">{isRecoverySessionReady ? 'Update password' : 'Validating recovery link…'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
