import { useLocation } from 'react-router-dom'
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type LocationState = {
  address?: string;
  geometry?: {
    lng: number;
    lat: number;
  };
};

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
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
  "/hq-healthy-banner.png",
];

const malls = [
  { name: "SM Mall of Asia", location: "Pasay" },
  { name: "SM Megamall", location: "Mandaluyong" },
  { name: "Glorietta", location: "Makati" },
  { name: "Greenbelt", location: "Makati" },
  { name: "TriNoma", location: "Quezon City" },
  { name: "Ayala Malls Manila Bay", location: "Parañaque" },
  { name: "Robinsons Galleria", location: "Quezon City" },
  { name: "Uptown Mall", location: "Taguig" },
];

function Shop() {
  const location = useLocation();
  const state = location.state as LocationState || {};
  const { address, geometry } = state;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 md:grid-cols-8 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
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
