import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RetailerDashboard from "./pages/RetailerDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import Register from "./pages/Register";


function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/retailer" element={<RetailerDashboard />} />
        <Route path="/manufacturer" element={<ManufacturerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
