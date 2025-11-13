import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;

    const fetchProfile = async () => {
        try {
            const res = await fetch("http://localhost:3001/auth/profile", {
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (err) {
            setUser(null);
            throw err;
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const login = async (credentials) => {
        try{
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || "Failed to login");
            }
            setUser(data.user);
            return res
        }catch(error){
            throw error
        }
    }

    const signUp = async (credentials) => {
        try {
            const res = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || "Failed to sign up");
            }
            return res
        } catch (error) {
            throw error
        }
    }
    const googleLogin = async (token) => {
       try {
         const res = await fetch("http://localhost:3001/auth/glogin", {
           method: "POST",
           credentials: "include",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ token }),
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data.message || "Google login failed");
         setUser(data.user);
         return res;
       } catch (error) {
         throw error;
       }
     };
    return (
        <AuthContext.Provider value={{ user, login, signUp, isAuthenticated, googleLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}