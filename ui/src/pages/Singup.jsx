import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupForm() {
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await signUp({username, name, password})
            if (res.ok){
                navigate("/")
            }
        }catch(err){
            console.log('errr: ', err.message)
            setError(err.message)
        }
    }
    return (
        <div className="flex flex-col w-full max-w-sm mx-auto mt-10 p-6 shadow-md rounded-md">
            <div className="flex justify-between">
                <h1 className="font-medium">Sign Up</h1>
                <Link to={"/login"} className="text-sm text-pink-600 hover:underline hover:decoration-pink-600 hover:underline-offset-4">Login</Link>
            </div>
            <p className="text-sm text-gray-500 w-2/3 mt-1">Enter your details below to create your account</p>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                    <p className="text-sm text-red-600 h-4">
                        {error && error.includes("User") ? error : ""}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirm_password">Confirm password</label>
                        <input
                            id="confirm_password"
                            type="password"
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className="text-sm text-red-600 h-4">{password && confirm_password && password !== confirm_password ? "Passwords do not match" : ""}</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-pink-600 text-white rounded-md py-2 mt-2 hover:bg-pink-700 transition"
                >
                    Sign Up
                </button>
            </form>

            <button
                className="mt-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-pink-100 transition"
                onClick={() => window.location.href = "/api/auth/google"}
            >
                Continue with Google
            </button>
        </div>
    );
}