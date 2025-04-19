import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {message && <p>{message}</p>}
        
        <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" required />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
