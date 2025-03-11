import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate(); // For redirection
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/user/reset-password", 
                { token, password }, // Send token & new password
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(response.data.message);
            setLoading(false);
            
            // Redirect after 3 seconds
            setTimeout(() => navigate("/login"), 3000);

        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong!");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

                {message && <p className="text-red-500 text-center">{message}</p>}

                <form onSubmit={handleResetPassword} className="flex flex-col">
                    <label className="mb-2 font-medium">New Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded px-3 py-2 mb-4"
                        required
                    />

                    <label className="mb-2 font-medium">Confirm Password</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border rounded px-3 py-2 mb-4"
                        required
                    />

                    <button 
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
