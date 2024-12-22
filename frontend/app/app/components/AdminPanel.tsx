"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  userId: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin" || userRole === "instructor");
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  const handleNavigateToStudentSearch = () => {
    router.push("/student-search");
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  if (!isAdmin) {
    return null;
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/users/${selectedUser.userId}`,
        {
          email: selectedUser.email,
          role: selectedUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh user list
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      if (axios.isAxiosError(error)) {
        console.error("Full error response:", error.response);
      }
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/users/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (axios.isAxiosError(error)) {
        console.error("Full error response:", error.response);
      }
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={fetchUsers}>Fetch Users</button>
      <button onClick={handleNavigateToStudentSearch}>Search Students</button>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Edit User</h2>
            <label>Email:</label>
            <input
              type="text"
              value={selectedUser?.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <label>Role:</label>
            <input
              type="text"
              value={selectedUser?.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            />
            <button onClick={handleSaveUser}>Save</button>
            <button onClick={() => setSelectedUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  },
};

export default AdminPanel;
