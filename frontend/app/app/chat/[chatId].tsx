'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]); // Store all chats
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Selected chat ID
  const [messages, setMessages] = useState<any[]>([]); // Store messages for the selected chat
  const [newMessage, setNewMessage] = useState(''); // New message content

  const userId = '12345'; // Replace with dynamic user ID (e.g., from authentication)
  const router = useRouter(); // For navigation if needed

  // Fetch all chats
  useEffect(() => {
    fetch('http://localhost:5001/chats')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error('Failed to fetch chats:', err));
  }, []);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (selectedChat) {
      fetch(`http://localhost:5001/messages/chat/${selectedChat}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error('Failed to fetch messages:', err));
    }
  }, [selectedChat]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Avoid sending empty messages

    fetch('http://localhost:5001/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, chatId: selectedChat, content: newMessage }),
    })
      .then((res) => res.json())
      .then((message) => {
        setMessages([...messages, message]); // Append new message to the list
        setNewMessage(''); // Clear the input field
      })
      .catch((err) => console.error('Failed to send message:', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat Page</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Chats Section */}
        <div>
          <h2>Chats</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {chats.map((chat) => (
              <li
                key={chat.id}
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedChat === chat.id ? '#e0e0e0' : '#f9f9f9',
                  border: '1px solid #ddd',
                }}
                onClick={() => setSelectedChat(chat.id)}
              >
                Chat ID: {chat.id}
              </li>
            ))}
          </ul>
        </div>

        {/* Messages Section */}
        <div style={{ flex: 1 }}>
          <h2>Messages</h2>
          {selectedChat ? (
            <>
              <div
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  marginBottom: '10px',
                  height: '300px',
                  overflowY: 'auto',
                }}
              >
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: '10px' }}>
                      <strong>{msg.userId}:</strong> {msg.content}
                    </div>
                  ))
                ) : (
                  <p>No messages yet</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p>Select a chat to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
