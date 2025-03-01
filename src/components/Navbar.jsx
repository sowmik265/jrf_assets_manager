"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-[#BE1E2D] text-white p-4 flex justify-between items-center shadow-md">
      {/* Company Logo */}
      <div className="flex items-center">
        <Image src="/jrf-logo.png" alt="Company Logo" width={120} height={40} priority />
      </div>

      {/* Logout Button (Visible only when user is logged in) */}
      {session && (
        <button
          onClick={handleLogout}
          className="bg-white text-[#BE1E2D] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

