import pool from "@/lib/db"; 

// Handle GET request to fetch all users
export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Error fetching users", { status: 500 });
  }
}
