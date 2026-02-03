import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "retailer",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
  
      const formData = new URLSearchParams();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);

      const res = await API.post("/auth/register", formData);

      console.log("Register success:", res.data);
      setMsg("Signup successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      console.error(err);
      setMsg("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        >
          <option value="retailer">Retailer</option>
          <option value="manufacturer">Manufacturer</option>
        </select>

        <button
          onClick={register}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>

        {msg && (
          <p className="mt-4 text-center text-green-600">{msg}</p>
        )}
      </div>
    </div>
  );
}
