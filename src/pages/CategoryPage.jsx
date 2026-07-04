import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mallsWithItems } from "../data/mallData";
import { addToCart, selectCoordinates } from "../redux/globalSlice";
import { calculateDistance } from "../utils/distance";
import { productIcon, categoryTint } from "../utils/productIcon";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coords = useSelector(selectCoordinates);

  const readableCategory = category.replace(/-/g, " ");

  const mallsWithCategory = mallsWithItems
    .filter((mall) => mall.categories[category]?.length > 0)
    .map((mall) => ({
      ...mall,
      distance: coords
        ? calculateDistance(coords.lat, coords.lng, mall.lat, mall.lng)
        : null,
    }))
    .sort((a, b) =>
      coords ? a.distance - b.distance : a.name.localeCompare(b.name)
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold capitalize text-gray-800">
          {readableCategory}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
        >
          ← Back to Shop
        </button>
      </div>

      {mallsWithCategory.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No items available in this category.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {mallsWithCategory.map((mall) => (
            <div
              key={mall.name}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Mall header */}
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">{mall.name}</h2>
                {mall.distance !== null && (
                  <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
                    {mall.distance.toFixed(1)} km away
                  </span>
                )}
              </div>

              {/* Product list */}
              <ul className="divide-y divide-gray-100">
                {mall.categories[category].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 px-5 py-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg shrink-0 ${categoryTint(category)}`}>
                      <img
                        src={productIcon(item.name, category)}
                        alt=""
                        className="w-7 h-7"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800">{item.name}</p>
                      <p className="text-sm font-semibold text-green-600">₱{item.price}</p>
                    </div>
                    <button
                      onClick={() =>
                        dispatch(addToCart({ ...item, mall: mall.name, category }))
                      }
                      className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
