"use client"

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function UserDashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-4">
        <h1>Welcome to the User Dashboard, {session.user.name}</h1>
        <p>Your role: {session.user.role}</p>
      </div>
    </div>
  );
}
