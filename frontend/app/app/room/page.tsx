"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

export interface Room {
  _id: string;
  name: string;
  description: string;
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null); // Dynamically fetch user ID
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  // Fetch userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User is not logged in.");
    }
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/rooms`);
        setRooms(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Error fetching rooms.");
        } else {
          setError("Unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [BASE_URL]);

  const createRoom = async () => {
    if (!userId) {
      setError("User ID is not available. Please log in.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/rooms`, {
        userId,
        name,
        description,
      });
      setRooms([...rooms, response.data]);
      setName("");
      setDescription("");
    } catch (error) {
      setError("Error creating room. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <h1 className="text-4xl font-semibold text-center mb-6">Rooms</h1>

        {loading ? (
          <p className="text-xl text-gray-600 text-center">Loading rooms...</p>
        ) : (
          <div>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Input Fields and Button */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Room Name"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Room Description"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={createRoom}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-all duration-200"
              >
                Create Room
              </button>
            </div>

            {/* Rooms List */}
            <div>
              <ul className="space-y-4">
                {rooms.map((room) => (
                  <li
                    key={room._id}
                    className="p-4 bg-white rounded-md shadow-md hover:bg-gray-50 transition"
                  >
                    <a
                      onClick={() => router.push(`/room/chat/${room._id}`)}
                      className="text-xl font-bold text-green-600 cursor-pointer hover:underline"
                    >
                      {room.name}
                    </a>
                    <p className="text-gray-600">{room.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
