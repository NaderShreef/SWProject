'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar'; // Import the Navbar

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl?: string;
}

const EditProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = '6753292b95322bb375eeffcc'; // Replace with dynamic user ID from authentication/session

  // Fetch user details to pre-fill the form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details.');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      alert('Profile updated successfully.');
      router.push('/profile'); // Redirect back to profile page after success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
      setError(errorMessage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                onChange={(e) => setUser((prev) => prev && { ...prev, name: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                onChange={(e) => setUser((prev) => prev && { ...prev, email: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Role</label>
              <select
                value={user?.role || ''}
                onChange={(e) => setUser((prev) => prev && { ...prev, role: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Profile Picture URL</label>
              <input
                type="text"
                value={user?.profilePictureUrl || ''}
                onChange={(e) =>
                  setUser((prev) => prev && { ...prev, profilePictureUrl: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
