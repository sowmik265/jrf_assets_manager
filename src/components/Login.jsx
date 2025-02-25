"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "/public/login-animation.json";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react"; // Import useSession to track session

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession(); // Track session

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
      setError("Invalid email or password");
    } else {
      console.log("Login successful:", res);
    }
  };

  useEffect(() => {
    // Check if user is logged in and redirect based on role
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin"); // Redirect to admin dashboard
      } else if (session?.user?.role === "user") {
        router.push("/users"); // Redirect to user dashboard
      }
    }
  }, [status, session, router]); // Re-run if session or status changes

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-[#BE1E2D] p-4">
      <div className="w-full flex justify-center mt-4 mb-4">
        <Image src="/jrf-logo.png" alt="JRF Logo" width={500} height={300} />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie animationData={animationData} className="w-72 h-72" />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#BE1E2D]">Login</h2>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#BE1E2D] text-white p-2 rounded hover:bg-red-700"
          >
            Login
          </button>
          <p className="text-center mt-4 text-sm">
            Not registered?{" "}
            <a href="/register" className="text-[#BE1E2D] font-bold">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
