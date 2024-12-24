"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const Chat = () => {
  const { id: roomId } = useParams(); // Extract room ID from URL
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  // Fetch the chatId associated with the roomId
  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chats/room/${roomId}`);
        if (response.data.length > 0) {
          setChatId(response.data[0]._id); // Use the first chat associated with the room
        } else {
          setChatId(null); // No chat exists
        }
      } catch (error) {
        setError("Error fetching chat ID.");
      }
    };

    fetchChatId();
  }, [BASE_URL, roomId]);

  // Fetch messages for the chatId
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      try {
        const response = await axios.get(`${BASE_URL}/messages/chat/${chatId}`);
        setMessages(response.data);
      } catch (error) {
        setError("Error fetching messages.");
      }
    };

    fetchMessages();
  }, [BASE_URL, chatId]);

  // Handle sending a new message
  const sendMessage = async () => {
    const userId = "6767259ac6fe8e06b1000a90"; // Replace with actual user logic
    try {
      const response = await axios.post(`${BASE_URL}/messages`, {
        userId,
        chatId,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      setError("Error sending message.");
    }
  };

  // Handle creating a new chat
  const createChat = async () => {
    const userId = "6767259ac6fe8e06b1000a90"; // Replace with actual user logic
    try {
      const response = await axios.post(`${BASE_URL}/chats`, {
        userId,
        roomId,
      });
      setChatId(response.data._id); // Set the new chat ID
      setError(""); // Clear error
    } catch (error) {
      setError("Error creating chat. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-800">Chat Room</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!chatId ? (
          <div className="text-center">
            <p className="text-gray-700 text-lg mb-4">No chat found for this room.</p>
            <button
              onClick={createChat}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Create Chat
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Messages Section */}
            <div className="bg-white rounded-lg shadow-md p-6 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Messages</h2>
              <ul className="space-y-4">
                {messages.map((message, index) => (
                  <li
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg shadow-md border border-blue-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-blue-600">{message.userId}</strong>
                      <span className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input Section */}
            <div className="flex items-center bg-white rounded-lg shadow-md p-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="ml-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

