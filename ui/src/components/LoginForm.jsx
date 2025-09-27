import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <div className="flex flex-col w-full max-w-sm mx-auto mt-10 p-6 shadow-md rounded-md">
            <div className="flex justify-between">
                <h1 className="font-medium">Login</h1>
                <Link to={"/signup"} className="text-sm text-pink-600 hover:underline hover:decoration-pink-600 hover:underline-offset-4">Sign Up</Link>
            </div>
            <p className="text-sm text-gray-500 w-2/3 mt-1">Enter your username below to login to your account</p>
            <form className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password">Password</label>
                        <a
                            href="#"
                            className="text-sm text-pink-600 hover:underline hover:decoration-pink-600 hover:underline-offset-4"
                            onClick={(e) => e.preventDefault()}
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600"
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
                className="mt-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-pink-100 transition"
                onClick={() => window.location.href = "/api/auth/google"}
            >
                Continue with Google
            </button>
        </div>
    )
}