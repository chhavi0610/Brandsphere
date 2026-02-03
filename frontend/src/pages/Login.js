import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      setMsg("Login successful");

      // 🔥 redirect based on role
      setTimeout(() => {
        if (res.data.role === "manufacturer") {
          navigate("/manufacturer");
        } else {
          navigate("/retailer");
        }
      }, 800);

    } catch (err) {
      setMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          BrandSphere Login
        </h2>

        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-4 text-center">
          New user?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 underline"
          >
            Sign up
          </button>
        </p>

        {msg && (
          <p className="mt-4 text-center text-red-500">{msg}</p>
        )}
      </div>
    </div>
  );
}
