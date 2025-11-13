import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
export default function Login() {
    const { login, user, googleLogin } = useAuth()
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await googleLogin(token);
            if (res.ok) {
                navigate("/");
            }
        } catch (error) {
            console.error("Google login error:", error.message);
        }
    };
    
        const handleGoogleError = () => {
            console.log("Google login failed");
        };
const handleGlogin = useGoogleLogin({
  onSuccess: handleGoogleSuccess,
  onError: handleGoogleError,
});

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login({ username, password });
            navigate("/");
        } catch (err) {
            console.log('Error recieved, ', err.message);
        }
    }
    return (
        <div className="flex flex-col w-full max-w-sm mx-auto mt-10 p-6 shadow-md rounded-md">
            <div className="flex justify-between">
                <h1 className="font-medium">Login</h1>
                <Link to={"/signup"} className="text-sm text-pink-600 hover:underline hover:decoration-pink-600 hover:underline-offset-4">Sign Up</Link>
            </div>
            <p className="text-sm text-gray-500 w-2/3 mt-1">Enter your username below to login to your account</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-pink-600 text-white rounded-md py-2 mt-2 hover:bg-pink-700 transition"
                >
                    Login
                </button>
            </form>

            <button
                onClick={() => handleGlogin()}
                className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            >
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-gray-700">Sign in with Google</span>
            </button>


        </div>
    )
}