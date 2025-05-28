import { useLocation } from 'react-router-dom'
import React from 'react';

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

function Shop() {
  const location = useLocation();
  const state = location.state as LocationState || {};
  const { address, geometry } = state;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Shop Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-8">
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
    </div>
  );
}

export default Shop;
