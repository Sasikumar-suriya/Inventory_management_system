import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (e.g., token exists in localStorage)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <nav className="bg-primary p-4 text-accent flex justify-between">
      <div className="font-bold text-lg">Inventory System</div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={handleLogin} 
            className="bg-accent text-primary px-3 py-1 rounded"
          >
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;