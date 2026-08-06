import React, { useState } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CategorySlider from './components/CategorySlider';
import ProductGrid from './components/ProductGrid';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import SeoInspectionModal from './components/SeoInspectionModal';
import CSharpApiModal from './components/CSharpApiModal';
import ZipDownloadModal from './components/ZipDownloadModal';
import BrandsSlider from './components/BrandsSlider';
import Footer from './components/Footer';

import { PRODUCTS, CATEGORIES } from './data/mockData';
import { Product, CartItem } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [isCSharpModalOpen, setIsCSharpModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerToast(`"${product.title}" به سبد خرید اضافه شد.`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Filter products by search, category, and subcategory
  const filteredProducts = PRODUCTS.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchEng = p.englishTitle.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchEng) return false;
    }

    if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
      return false;
    }

    if (selectedSubCategory !== 'all' && p.subCategorySlug !== selectedSubCategory) {
      return false;
    }

    return true;
  });

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const categoryName = selectedCategoryObj ? selectedCategoryObj.name : 'همه محصولات مواد غذایی';
  
  const subCategoryObj = selectedCategoryObj?.subCategories.find((s) => s.slug === selectedSubCategory);
  const subCategoryName = subCategoryObj ? subCategoryObj.name : 'همه';

  return (
    <div className="min-h-screen bg-organic-pattern text-slate-800 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header with Megamenu & Search */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenZipModal={() => setIsZipModalOpen(true)}
        onOpenCSharpModal={() => setIsCSharpModalOpen(true)}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        allProducts={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Hero Slider Section */}
      <HeroSlider
        onSelectCategory={(catSlug) => {
          setSelectedCategory(catSlug);
          setSelectedSubCategory('all');
        }}
      />

      {/* Main Categories Carousel */}
      <CategorySlider
        selectedCategory={selectedCategory}
        onSelectCategory={(catSlug) => {
          setSelectedCategory(catSlug);
          setSelectedSubCategory('all');
        }}
      />

      {/* Main High Density Products Grid */}
      <main className="flex-1">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          selectedCategoryName={categoryName}
          selectedSubCategoryName={subCategoryName}
        />

        {/* Brands Carousel */}
        <BrandsSlider />
      </main>

      {/* Footer */}
      <Footer
        onOpenZipModal={() => setIsZipModalOpen(true)}
        onOpenCSharpModal={() => setIsCSharpModalOpen(true)}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SeoInspectionModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
      />

      <CSharpApiModal
        isOpen={isCSharpModalOpen}
        onClose={() => setIsCSharpModalOpen(false)}
      />

      <ZipDownloadModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
      />

    </div>
  );
}
