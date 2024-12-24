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
  createdAt: string;
  failedLoginAttempts: number;
}

const MyProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Replace with the logged-in user's ID (you can get this from auth context or session)
  const userId = '6753292b95322bb375eeffcc';

  // Fetch user details
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
      }
    };

    fetchUser();
  }, [userId]);

  // Handle deleting the profile
  const handleDeleteProfile = async () => {
    const confirmed = confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile.');
      }

      alert('Profile deleted successfully.');
      router.push('/'); // Redirect to the home page after deletion
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
      setError(errorMessage);
    }
  };

  // Handle editing the profile
  const handleEditProfile = () => {
    router.push('/myprofile/edit'); // Navigate to the edit profile page
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
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
          <p className="text-gray-700 mb-2">
            <strong>User ID:</strong> {user.userId}
          </p>
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
            <strong>Account Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Failed Login Attempts:</strong> {user.failedLoginAttempts}
          </p>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
