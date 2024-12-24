'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/navbar'; // Adjust path as necessary
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl?: string;
  createdAt: string;
  failedLoginAttempts: number;
}

const MyProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        if (!userId || !token) {
          setError('User is not authenticated.');
          return;
        }

        console.log('Fetching user details for ID:', userId);

        const response = await axios.get(`http://localhost:5001/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user details.');
      }
    };

    fetchUser();
  }, []);

  // Handle Delete User
  const handleDeleteUser = async () => {
    const confirmed = confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      if (!userId || !token) {
        setError('User is not authenticated.');
        return;
      }

      await axios.delete(`http://localhost:5001/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Profile deleted successfully.');
      localStorage.clear(); // Clear user data from localStorage
      router.push('/'); // Redirect to home page
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  // Handle Edit User
  const handleEditUser = () => {
    setIsEditing(true);
    setEditedUser(user); // Set current user data for editing
  };

  const handleSaveUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      if (!editedUser || !userId || !token) {
        setError('User is not authenticated.');
        return;
      }

      await axios.put(
        `http://localhost:5001/users/${userId}`,
        {
          name: editedUser.name,
          email: editedUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(editedUser); // Update user state with edited data
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully.');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          {user.profilePictureUrl && (
            <img
              src={user.profilePictureUrl}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
          )}
          {!isEditing ? (
            <>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Account Created At:</strong>{' '}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Failed Login Attempts:</strong> {user.failedLoginAttempts}
              </p>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleEditUser}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="block text-gray-700 mb-2">
                <strong>Name:</strong>
                <input
                  type="text"
                  value={editedUser?.name || ''}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value } as User)
                  }
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block text-gray-700 mb-2">
                <strong>Email:</strong>
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value } as User)
                  }
                  className="w-full p-2 border rounded"
                />
              </label>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleSaveUser}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;

