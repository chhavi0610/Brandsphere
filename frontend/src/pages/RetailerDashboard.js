import { useEffect, useState } from "react";
import axios from "axios";

export default function RetailerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://chhavi0610.pythonanywhere.com/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async (productId) => {
    try {
      await axios.post(
        "https://chhavi0610.pythonanywhere.com/api/orders",
        { productId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://chhavi0610.pythonanywhere.com/api/orders"
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Retailer Dashboard</h2>

      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => placeOrder(p.id)}>Order</button>
        </div>
      ))}

      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o.id}>{o.status}</div>
      ))}
    </div>
  );
}
