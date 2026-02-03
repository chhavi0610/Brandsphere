import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RetailerDashboard from "./pages/RetailerDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/retailer" element={<RetailerDashboard />} />
        <Route path="/manufacturer" element={<ManufacturerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
