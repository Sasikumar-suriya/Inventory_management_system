import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar"; // Ensure correct casing
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import ForgotPassword from "./components/Forgotpassword";
import ResetPassword from "./components/ResetPassword";
import Category from "./pages/Category";

const App = () => {
  return (
    <div className="bg-background min-h-screen text-primary">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/category/create" element={<Category/>}/>
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

