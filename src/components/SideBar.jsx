"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiUsers, FiHome, FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <FiHome size={20} /> },
    { name: "Users", href: "/admin/users", icon: <FiUsers size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#BE1E2D] h-screen w-64 p-4 text-white flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 fixed md:relative`}
      >
        {/* Branding */}
        <div className="text-2xl font-bold mb-6 text-center">Admin Panel</div>

        {/* Menu Items */}
        <ul className="flex-1">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition duration-300 ${
                  pathname === item.href
                    ? "bg-white text-[#BE1E2D] font-bold"
                    : "hover:bg-red-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          onClick={() => signOut({callbackUrl: '/'})}
          className="flex items-center gap-3 bg-white text-[#BE1E2D] p-3 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 bg-[#BE1E2D] text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </div>
  );
}
