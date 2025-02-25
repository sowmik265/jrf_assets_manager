"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "/public/login-animation.json";
import Image from "next/image";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Sending registration data to the API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to login page after successful registration
        router.push("/");
      } else {
        setError(data.message); // Display error message
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#BE1E2D] p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center">
        <div className="w-full flex justify-center mb-4">
          <Image src="/jrf-logo.png" alt="JRF Logo" width={100} height={50} />
        </div>
        <div className="flex w-full flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <Lottie animationData={animationData} className="w-72 h-72" />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#BE1E2D]">
              Register
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleRegister}
              className="w-full bg-[#BE1E2D] text-white p-2 rounded hover:bg-red-700"
            >
              Register
            </button>
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <a href="/" className="text-[#BE1E2D] font-bold">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
