import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Welcome to the User Dashboard, {session.user.name}</h1>
        <p>Your role: {session.user.role}</p>
      </div>
    </div>
  );
}
