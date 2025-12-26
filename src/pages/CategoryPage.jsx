import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mallsWithItems } from "../data/mallData";
import { addToCart } from "../redux/globalSlice";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const readableCategory = category.replace(/-/g, " ");

  const mallsWithCategory = mallsWithItems.filter(
    (mall) => mall.categories[category] && mall.categories[category].length > 0
  );

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
            <h2 className="text-xl font-bold mb-3">{mall.name}</h2>

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
