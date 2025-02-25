"use client";

import React, { useState, useEffect } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Set the current role as default
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleUpdateRole = async () => {
    if (!newRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${selectedUser.user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update the users state with the new role
        setUsers(users.map((user) => 
          user.user_id === selectedUser.user_id ? { ...user, role: newRole } : user
        ));
        setSelectedUser(null); // Close the modal
      } else {
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.user_id !== userId));
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
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
                  onClick={() => handleEdit(user)}
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

      {/* Edit Role Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#BE1E2D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white">Edit User Role</h3>
            <div className="my-4">
              <label className="block text-white">Select Role</label>
              <select
                value={newRole}
                onChange={handleRoleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateRole}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200"
              >
                Update Role
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
