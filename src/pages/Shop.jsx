import { useNavigate } from 'react-router-dom';
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const categories = [
  { name: "Beverages", icon: "/beverages.svg" },
  { name: "Grocery", icon: "/grocery.svg" },
  { name: "Pharmacy", icon: "/pharmacy.svg" },
  { name: "Pets", icon: "/pets.svg" },
  { name: "Appliances", icon: "/appliances.svg" },
  { name: "Healthy", icon: "/healthy.svg" },
  { name: "Baby & Kids", icon: "/baby.svg" },
  { name: "Alcohol", icon: "/alcohol.svg" },
];

const banners = [
  "/hq-healthy-banner.png",
    "/support-local-banner.png",
  "/pet-essentials-banner.png",
  "/great-offers-banner.png",
];

const malls = [
  { name: "SM Mall of Asia",         lat: 14.535067,  lng: 120.982155 },  // Pasay :contentReference[oaicite:0]{index=0}
  { name: "SM Megamall",            lat: 14.584447,  lng: 121.056770 },  // Mandaluyong / Ortigas area :contentReference[oaicite:1]{index=1}
  { name: "Glorietta",              lat: 14.5507,    lng: 121.0218   },  // Makati / Ayala Center :contentReference[oaicite:2]{index=2}
  { name: "Greenbelt",              lat: 14.5518,    lng: 121.0211   },  // Makati / Ayala Center — approximate from 14°33′06.6″N 121°01′19.9″E :contentReference[oaicite:3]{index=3}
  { name: "TriNoma",                lat: 14.654,     lng: 121.0326   },  // Quezon City / North Ave area :contentReference[oaicite:4]{index=4}
  { name: "Ayala Malls Manila Bay", lat: 14.5233,    lng: 120.9884   },  // Parañaque / Aseana City along Manila Bay :contentReference[oaicite:5]{index=5}
  { name: "Robinsons Galleria",     lat: 14.586,     lng: 121.059     },  // Quezon City / Ortigas — approximate; this is the mall’s general location. :contentReference[oaicite:6]{index=6}
  { name: "Uptown Mall",            lat: 14.556389,  lng: 121.054444  },  // Taguig / Bonifacio Global City, 36th St. corner 9th Ave. (≈ 14°33′23″N 121°03′16″E) :contentReference[oaicite:7]{index=7}
];


function Shop() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 md:grid-cols-8 gap-8">
        {categories.map((cat, index) => (
        <div
            key={index}
            onClick={() => navigate(`/${cat.name.toLowerCase().replace(/\s+/g, '-')}`)}
            className="flex flex-col items-center border-lightblue rounded-lg p-4 shadow hover:shadow-md hover:bg-gray-50 transition duration-300 cursor-pointer"
        >
            <img src={cat.icon} alt={cat.name} className="w-10 h-10 mb-2" />
            <span className="text-sm font-medium text-center">{cat.name}</span>
        </div>
        ))}
      </div>

      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {banners.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-80 object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {malls.map((mall, index) => (
            <div
              key={index}
              className="border-lightblue rounded-lg p-4 shadow hover:shadow-md transition duration-300"
            >
              <h3 className="font-semibold text-lg">{mall.name}</h3>
              <p className="text-gray-600">{mall.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
