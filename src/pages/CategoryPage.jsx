import { useParams, useNavigate } from "react-router-dom";
import { items } from "../data/items";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  // The category in URL is like "frozen-foods"
  const currentItems = items[category] || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold capitalize text-gray-800">
          {category?.replace(/-/g, " ")}
        </h1>
        <button
          onClick={() => navigate("/select-supermarket")}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition cursor-pointer"
        >
          Back to Shop
        </button>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="border-lightblue rounded-lg p-4 shadow hover:shadow-md hover:bg-gray-50 transition duration-300 cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">₱{item.price}</p>

              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No items in this category.</p>
        )}
      </div>
    </div>
  );
}
