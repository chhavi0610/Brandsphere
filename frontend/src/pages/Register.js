import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "retailer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Signup successful! Please login.");
      window.location.href = "/";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border" />

        <select name="role" onChange={handleChange} className="w-full mb-4 p-2 border">
          <option value="retailer">Retailer</option>
          <option value="manufacturer">Manufacturer</option>
        </select>

        <button onClick={register} className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
}
