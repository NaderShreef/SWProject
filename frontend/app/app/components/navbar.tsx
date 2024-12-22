'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter(); // Initialize the Next.js router

  // Handle the navigation for different pages
  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the given path
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        {/* Left-side navigation links */}
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/home');
          }} // Home Button
        >
          Home
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/about');
          }} // About Button
        >
          About
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/courses');
          }} // Courses Button
        >
          Courses
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/dashboard');
          }} // Dashboard Button
        >
          Dashboard
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/room');
          }} // Chat Button
        >
          Chat
        </a>
      </div>

      {/* Right-side buttons */}
      <div style={styles.navButtons}>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/profile')} // Navigate to My Profile
        >
          My Profile
        </button>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/my-courses')} // Navigate to My Courses
        >
          My Courses
        </button>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', // Separate links and buttons
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#000', // Black navbar
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#fff', // White button
    color: '#000', // Black text
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ccc', // Button hover color
  },
};

export default Navbar;
