import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        
        <p className="mt-2">
          <button 
            type="button" 
            onClick={() => navigate("/forgot-password")} 
            className="text-blue-500"
          >
            Forgot Password?
          </button>
        </p>
        
        <p className="mt-2">
          Don't have an account? 
          <button 
            type="button" 
            onClick={() => navigate("/create")} // Use navigate instead of <a>
            className="text-blue-500 ml-1"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
