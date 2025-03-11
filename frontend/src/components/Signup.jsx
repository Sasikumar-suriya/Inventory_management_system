import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/create", formData);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    }
  };
  return  <div className="flex justify-center items-center h-screen">
  <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-bold mb-4">Signup</h2>
    {error && <p className="text-red-500">{error}</p>}
    
    <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
    <input type="text" name="contact" placeholder="Contact" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
    
    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
    <p className="mt-2">Already have an account? <a href="/" className="text-blue-500">Login</a></p>
  </form>
</div>;
};

export default Signup; // Ensure this is here!
