import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-primary p-4 text-accent flex justify-between">
      <div className="font-bold text-lg">Inventory System</div>
      <div className="space-x-4">
        
        <button onClick={handleLogout} className="bg-accent text-primary px-3 py-1 rounded">
          Login / Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
