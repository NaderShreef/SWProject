'use client';
import React from 'react';
import { useRouter } from 'next/navigation';  // Correct import for Next.js 13 app directory

export default function Home() {
  const router = useRouter();  // Using the correct router from next/navigation

  // Handle the button click to navigate to /home
  const handleClick = () => {
    router.push('/home');  // Redirects to /home
  };

  return (
    <div style={styles.page}>
      {/* Immediate rendering of the button */}
      <div style={styles.centerContent}>
        <h1>Welcome to Our E-Learning Website</h1>
        <p>We are glad to have you here. Click the button below to continue.</p>
        <button style={styles.button} onClick={handleClick}>
          Click here to continue
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0070f3', // Blue button
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '20px',
  },
};
