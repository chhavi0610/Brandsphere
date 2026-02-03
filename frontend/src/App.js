import Login from "./pages/Login";
import RetailerDashboard from "./pages/RetailerDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import Register from "./pages/Register";


function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Login />;
  }

  if (role === "manufacturer") {
    return <ManufacturerDashboard />;
  }

  if (role === "retailer") {
    return <RetailerDashboard />;
  }
  
  if (window.location.pathname === "/register") {
  return <Register />;
}


  localStorage.clear();
  return <Login />;
}

export default App;
