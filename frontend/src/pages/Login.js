import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://chhavi0610.pythonanywhere.com/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login success:", res.data);
      setMsg("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {msg}
    </div>
  );
}
