import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access denied. Please log in.</p>;
  }

  return (
    <div className="p-6">
      <h1>Welcome to the Admin Dashboard, {session.user.name}</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}
