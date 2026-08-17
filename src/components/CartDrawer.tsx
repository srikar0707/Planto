import React, { useState } from 'react';
import { CartItem, WebsiteSettings } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Send, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  settings: WebsiteSettings;
  onCheckout: (customer: { customerName: string; phone: string; address: string }) => Promise<string>;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your Name and Phone number to proceed with WhatsApp checkout.');
      return;
    }

    setIsSubmitting(true);
    let orderNumber: string;
    try {
      orderNumber = await onCheckout({ customerName: customerName.trim(), phone: customerPhone.trim(), address: customerAddress.trim() || 'To be specified' });
    } catch (error) {
      console.error(error);
      alert('We could not save your order. Please try again before opening WhatsApp.');
      setIsSubmitting(false);
      return;
    }

    // Format products list
    const productLines = cartItems
      .map((item) => `• ${item.product.name} × ${item.quantity} (₹${item.product.price * item.quantity})`)
      .join('\n');

    // WhatsApp Message
    const message = `Hello PlantO,

I would like to place an order.

Order ID: ${orderNumber}

Customer Name: ${customerName.trim()}
Phone Number: ${customerPhone.trim()}
Delivery Address: ${customerAddress.trim() || 'To be specified'}

Products:
${productLines}

Total Items: ${totalItemsCount}
Total Amount: ₹${totalPrice}

Please contact me regarding this order.`;

    const encodedText = encodeURIComponent(message);
    const cleanWhatsApp = (settings.whatsAppNumber || '919876543210').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    onClearCart();
    onClose();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F8F3] border-l border-[#1B3022]/15 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-[#F9F8F3] border-b border-[#1B3022]/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#2D4F36]" />
              <h2 className="text-xl font-serif font-bold text-[#1B3022]">
                Your Cart
              </h2>
              <span className="bg-[#2D4F36] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {totalItemsCount} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#1B3022] hover:bg-[#1B3022]/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-[#1B3022]/20 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#1B3022]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#1B3022]/60">
                  Browse our nursery collection and add green companions to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2D4F36] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1B3022] transition-colors"
                >
                  Explore Plants
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 shadow-sm flex items-center space-x-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#1B3022]/10"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#2D4F36] block">
                      {item.product.category}
                    </span>
                    <h4 className="text-xs font-serif font-bold text-[#1B3022] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#1B3022] block mt-0.5">
                      ₹{item.product.price}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-[#F1EFE7] hover:bg-[#2D4F36] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full bg-[#F1EFE7] hover:bg-[#2D4F36] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#1B3022] block">
                      ₹{item.product.price * item.quantity}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#1B3022]/40 hover:text-rose-600 mt-2 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#1B3022]/15 space-y-4">
              {/* Customer Contact Details Form */}
              <div className="space-y-3 bg-[#F9F8F3] p-4 rounded-2xl border border-[#1B3022]/10">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2D4F36] block">
                  Delivery Details for WhatsApp Order
                </span>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Delivery Address / City"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#1B3022]/70">
                  <span>Total Items</span>
                  <span>{totalItemsCount}</span>
                </div>
                <div className="flex justify-between font-serif font-extrabold text-base text-[#1B3022] pt-2 border-t border-[#1B3022]/10">
                  <span>Grand Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Action */}
              <button
                onClick={handleWhatsAppCheckout}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs uppercase tracking-widest font-extrabold rounded-full transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{isSubmitting ? 'Saving order…' : 'Checkout via WhatsApp'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
