import pool from "@/lib/db";

// Handle DELETE request for a specific user
export async function DELETE(req, context) {
  try {
    const params = await context.params; // Await params correctly
    const userId = params?.userId; // Extract userId safely

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const [result] = await pool.execute("DELETE FROM users WHERE user_id = ?", [
      userId,
    ]);

    if (result.affectedRows === 0) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Error deleting user", { status: 500 });
  }
}

// Handle PATCH request to update only the user role
export async function PATCH(req, context) {
  const params = await context.params; // Await params before accessing its properties
  const { userId } = params; // Extract userId from request params
  const { role } = await req.json(); // Extract role from request body

  // Ensure role is provided
  if (!role) {
    return new Response("Role is required", { status: 400 });
  }

  try {
    // Update the user's role in the database
    const [result] = await pool.execute(
      "UPDATE users SET role = ? WHERE user_id = ?",
      [role, userId]
    );

    // Check if the user was found and updated
    if (result.affectedRows === 0) {
      return new Response("User not found", { status: 404 });
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "User role updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response("Error updating user role", { status: 500 });
  }
}
