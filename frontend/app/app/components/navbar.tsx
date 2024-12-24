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
          }}
        >
          Home
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/about');
          }}
        >
          About
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/courses');
          }}
        >
          Courses
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/dashboard');
          }}
        >
          Dashboard
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/room');
          }}
        >
          Chat
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/quizzes');
          }}
        >
          Quizzes
        </a>
      </div>

      {/* Right-side buttons */}
      <div style={styles.navButtons}>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/myprofile')} // Navigate to My Profile
        >
          My Profile
        </button>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/mycourses')} // Navigate to My Courses
        >
          My Courses
        </button>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/mydashboard')} // Navigate to My Dashboard
        >
          My Dashboard
        </button>
        <button
          style={styles.button}
          onClick={() => handleNavigation('/notes')} // Navigate to Notes
        >
          Notes
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
    marginRight: '20px', // Adjusts the buttons position to the left
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
