import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { normalizeCategory } from '../utils/normalizeCategory';
import { mallsWithItems } from '../data/mallData';
import { selectCoordinates, openLocationModal, addToCart, showToast } from '../redux/globalSlice';
import { calculateDistance } from '../utils/distance';
import { productIcon, categoryTint } from '../utils/productIcon';

const categories = [
  { name: "Beverages",  icon: "/beverages.svg" },
  { name: "Grocery",    icon: "/grocery.svg" },
  { name: "Pharmacy",   icon: "/pharmacy.svg" },
  { name: "Pets",       icon: "/pets.svg" },
  { name: "Appliances", icon: "/appliances.svg" },
  { name: "Healthy",    icon: "/healthy.svg" },
  { name: "Baby & Kids",icon: "/baby.svg" },
  { name: "Alcohol",    icon: "/alcohol.svg" },
];

const banners = [
  "/hq-healthy-banner.png",
  "/support-local-banner.png",
  "/pet-essentials-banner.png",
  "/great-offers-banner.png",
];

const categoryIcons = {
  beverages: "/beverages.svg",
  grocery: "/grocery.svg",
  pharmacy: "/pharmacy.svg",
  pets: "/pets.svg",
  appliances: "/appliances.svg",
  healthy: "/healthy.svg",
  "baby-and-kids": "/baby.svg",
  alcohol: "/alcohol.svg",
};

const perks = [
  { icon: "🚚", title: "Fast delivery", text: "Groceries at your door in as fast as 1 hour." },
  { icon: "🥬", title: "Fresh guarantee", text: "Not fresh on arrival? We refund it, no questions asked." },
  { icon: "💳", title: "Secure payments", text: "Pay by card, protected by Stripe." },
  { icon: "🏬", title: "8 partner stores", text: "Shop the malls you already know and trust." },
];

const steps = [
  { step: "1", title: "Set your location", text: "Pin your address so we can find the stores around you." },
  { step: "2", title: "Fill your basket", text: "Browse categories and add items from nearby stores." },
  { step: "3", title: "Checkout & relax", text: "Pay securely and we deliver straight to your door." },
];

// Flatten mall inventories into a deduped product list for the featured sections
const allItems = [];
const seenNames = new Set();
for (const mall of mallsWithItems) {
  for (const [category, items] of Object.entries(mall.categories)) {
    for (const item of items) {
      if (seenNames.has(item.name)) continue;
      seenNames.add(item.name);
      allItems.push({ ...item, category, mall: mall.name });
    }
  }
}

const popularItems = Object.keys(categoryIcons)
  .map((cat) => allItems.find((item) => item.category === cat))
  .filter(Boolean);

const budgetItems = allItems
  .filter((item) => item.price <= 100)
  .sort((a, b) => a.price - b.price)
  .slice(0, 8);

function ProductCard({ item, onAdd, onOpenCategory }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-green-400 transition duration-200">
      <button
        onClick={onOpenCategory}
        className={`flex items-center justify-center rounded-lg h-40 mb-3 ${categoryTint(item.category)}`}
      >
        <img
          src={productIcon(item.name, item.category)}
          alt=""
          className="w-20 h-20 drop-shadow-sm"
        />
      </button>
      <p className="font-medium text-sm text-gray-800 leading-snug">{item.name}</p>
      <p className="text-xs text-gray-400 mt-0.5 truncate">{item.mall}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-green-700">₱{item.price.toLocaleString()}</span>
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

function Shop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coords = useSelector(selectCoordinates);
  const [email, setEmail] = useState('');

  const malls = mallsWithItems
    .map((mall) => ({
      ...mall,
      distance: coords
        ? calculateDistance(coords.lat, coords.lng, mall.lat, mall.lng)
        : null,
    }))
    .sort((a, b) =>
      coords ? a.distance - b.distance : a.name.localeCompare(b.name)
    );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    dispatch(showToast("You're subscribed! Deals are on the way 🎉"));
    setEmail('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">

      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden">
        <img
          src="/produce-basket.jpg"
          alt=""
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 max-w-lg">
          <h1 className="text-white font-bold text-2xl sm:text-4xl leading-tight">
            Fresh groceries, delivered fast
          </h1>
          <p className="text-green-50 text-sm sm:text-base mt-2">
            Shop your favorite stores and get everything dropped at your door in as fast as one hour.
          </p>
          <button
            onClick={() => dispatch(openLocationModal())}
            className="mt-5 self-start bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-lg"
          >
            {coords ? 'Change delivery location' : 'Set delivery location'}
          </button>
        </div>
      </section>

      {/* Location prompt */}
      {!coords && (
        <section className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-gray-800 text-sm">Where should we deliver?</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Set your location to see stores near you sorted by distance.
            </p>
          </div>
          <button
            onClick={() => dispatch(openLocationModal())}
            className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Set delivery location
          </button>
        </section>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => navigate(`/${normalizeCategory(cat.name)}`)}
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-green-400 hover:bg-green-50 transition duration-200"
            >
              <img src={cat.icon} alt={cat.name} className="w-9 h-9" />
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Banners */}
      <section>
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 1024: { slidesPerView: 2, spaceBetween: 24 } }}
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-xl overflow-hidden"
        >
          {banners.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Promo ${index + 1}`}
                className="w-full h-64 object-contain rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Popular products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Popular Right Now
          </h2>
          <span className="text-xs text-gray-400">One pick from every aisle</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularItems.map((item) => (
            <ProductCard
              key={item.name}
              item={item}
              onAdd={() => dispatch(addToCart({ name: item.name, price: item.price }))}
              onOpenCategory={() => navigate(`/${item.category}`)}
            />
          ))}
        </div>
      </section>

      {/* Stores */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          {coords ? 'Stores Near You' : 'All Stores'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {malls.map((mall, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-green-400 transition duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-base shrink-0">
                {mall.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm leading-snug truncate">
                  {mall.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {mall.area}
                  {mall.distance !== null && ` · ${mall.distance.toFixed(1)} km away`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget finds */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Budget Finds Under ₱100
          </h2>
          <span className="text-xs text-gray-400">Everyday essentials, tiny prices</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {budgetItems.map((item) => (
            <ProductCard
              key={item.name}
              item={item}
              onAdd={() => dispatch(addToCart({ name: item.name, price: item.price }))}
              onOpenCategory={() => navigate(`/${item.category}`)}
            />
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center"
          >
            <div className="text-3xl mb-2">{perk.icon}</div>
            <p className="font-semibold text-gray-800 text-sm">{perk.title}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{perk.text}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 text-center">
          How GrocerEase Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <p className="font-semibold text-gray-800 text-sm">{s.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-700 rounded-2xl px-6 py-8 sm:px-10 text-center">
        <h2 className="text-white font-bold text-xl mb-1">Never miss a deal</h2>
        <p className="text-green-100 text-sm mb-5">
          Weekly promos, seasonal discounts, and fresh finds — straight to your inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="submit"
            className="bg-white text-green-700 hover:bg-green-50 font-semibold text-sm px-6 py-2.5 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}

export default Shop;
