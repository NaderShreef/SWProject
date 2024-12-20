'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';

export default function Home() {
  const router = useRouter(); // Initialize the Next.js router

  // Handle the button clicks to navigate to different pages
  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the given path
  };

  return (
    <div style={styles.page}>
      {/* Navbar Component */}
      <Navbar />

      {/* Centered Buttons */}
      <div style={styles.centerContent}>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/auth/login')} // Login Button
        >
          Login
        </button>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/auth/register')} // Register Button
        >
          Register
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Dark grey background
    color: '#fff',
  },
  centerContent: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
