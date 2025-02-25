"use client";

import React, { useState, useEffect } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the users data from the API
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Redirect to the edit user page or handle edit action
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    // Confirm delete action
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove deleted user from the state
        setUsers(users.filter((user) => user.user_id !== userId));
      } else {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-[#BE1E2D] text-white">
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Role</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{user.first_name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => handleEdit(user.user_id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
