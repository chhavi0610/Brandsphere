import { useEffect, useState } from "react";
import axios from "axios";

export default function ManufacturerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://chhavi0610.pythonanywhere.com/api/products/manufacturer"
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async (product) => {
    try {
      await axios.post(
        "https://chhavi0610.pythonanywhere.com/api/products",
        product,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manufacturer Dashboard</h2>
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
