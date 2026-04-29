import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mallsWithItems } from "../data/mallData";
import { addToCart, selectCoordinates } from "../redux/globalSlice";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCoordinates = useSelector(selectCoordinates);

  const readableCategory = category.replace(/-/g, " ");

  // Haversine formula to calculate distance in km
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get malls with category, sorted by distance if location selected
  const mallsWithCategory = mallsWithItems
    .filter((mall) => mall.categories[category] && mall.categories[category].length > 0)
    .map((mall) => ({
      ...mall,
      distance: selectedCoordinates
        ? calculateDistance(
            selectedCoordinates.lat,
            selectedCoordinates.lng,
            mall.lat,
            mall.lng
          )
        : null,
    }))
    .sort((a, b) => {
      if (selectedCoordinates) {
        return a.distance - b.distance;
      }
      return a.name.localeCompare(b.name);
    });

  const handleAddToCart = (item, mallName) => {
    dispatch(
      addToCart({
        ...item,
        mall: mallName,
        category,
      })
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold capitalize text-gray-800">
          {readableCategory}
        </h1>
        <button
          onClick={() => navigate("/select-supermarket")}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
        >
          Back to Shop
        </button>
      </div>

      {mallsWithCategory.length === 0 && (
        <p>No items available for this category.</p>
      )}

      <div className="space-y-6">
        {mallsWithCategory.map((mall) => (
          <div
            key={mall.name}
            className="border rounded-lg p-4 shadow hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{mall.name}</h2>
              {mall.distance !== null && (
                <span className="text-sm text-gray-500">
                  {mall.distance.toFixed(1)} km away
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {mall.categories[category].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">₱{item.price}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item, mall.name)}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
}
