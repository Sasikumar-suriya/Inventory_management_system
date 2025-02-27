import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Inventory from "../src/pages/Inventory";
import Navbar from "./components/navbar";
import ProtectedRoute from "../src/components/ProtectedRoute";


const App = () => {
  return (
    <div className="bg-background min-h-screen text-primary">
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
