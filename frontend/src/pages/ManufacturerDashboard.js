import { useEffect, useState } from "react";
import API from "../api";


export default function ManufacturerDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [msg, setMsg] = useState("");

  const manufacturerId = 1; // TEMP

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.reload();
};


  const loadProducts = () => {
    API.get("/products/")
      .then((res) => {
        const myProducts = res.data.filter(
          (p) => p.manufacturer_id === manufacturerId
        );
        setProducts(myProducts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    try {
      await API.post("/products/add", {
        manufacturer_id: manufacturerId,
        product_name: name,
        category: category,
        price: Number(price),
        MOQ: Number(moq),
      });

      setMsg("Product added successfully ✅");
      setName("");
      setCategory("");
      setPrice("");
      setMoq("");
      loadProducts();
    } catch {
      setMsg("Failed to add product ❌");
    }
  };
return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Manufacturer Dashboard</h2>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-xl font-semibold mb-4">Add Product</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="MOQ"
          value={moq}
          onChange={(e) => setMoq(e.target.value)}
        />
      </div>

      <button
        onClick={addProduct}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>

      <p className="mt-2 text-green-600">{msg}</p>
    </div>

    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">My Products</h3>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            {p.product_name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}
