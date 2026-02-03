import { useEffect, useState } from "react";
import API from "../api";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.reload();
};

export default function RetailerDashboard() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [msg, setMsg] = useState("");

  const brandId = 1;

  useEffect(() => {
    API.get("/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const placeOrder = async (productId) => {
    try {
      await API.post("/orders/place", {
        brand_id: brandId,
        product_id: productId,
        quantity: 10,
      });
      setMsg("Order placed successfully ✅");
    } catch {
      setMsg("Order failed ❌");
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await API.get(
        `/recommend/manufacturers?category=${category}`
      );
      setRecommendations(res.data);
    } catch {
      setMsg("Recommendation failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Retailer Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ✅ MESSAGE DISPLAY (THIS FIXES ESLINT ERROR) */}
      {msg && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800">
          {msg}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                {p.product_name} — ₹{p.price}
              </span>
              <button
                onClick={() => placeOrder(p.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Place Order
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          Manufacturer Recommendations
        </h3>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            onClick={getRecommendations}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Get
          </button>
        </div>

        <ul className="space-y-2">
          {recommendations.map((r, index) => (
            <li key={index} className="border p-2 rounded">
              Manufacturer ID: {r.manufacturer_id} | Score:{" "}
              {r.score.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
