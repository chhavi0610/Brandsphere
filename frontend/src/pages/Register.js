import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post(
        "https://chhavi0610.pythonanywhere.com/api/auth/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res.data);
      setMsg("Signup successful!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setMsg("Signup failed");
    }
  };

  return (
    <div>
      <input name="name" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="retailer">Retailer</option>
        <option value="manufacturer">Manufacturer</option>
      </select>
      <button onClick={register}>Register</button>
      {msg}
    </div>
  );
}
