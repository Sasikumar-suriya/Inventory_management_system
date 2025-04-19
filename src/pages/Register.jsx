import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
        <button className="bg-green-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
