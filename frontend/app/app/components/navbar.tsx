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
        <a
          href="#"
          style={styles.link}
          onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }} // Home Button
        >
          Home
        </a>
        <a
          href="#"
          style={styles.link}
          onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }} // About Button
        >
          About
        </a>

        <a
          href="#"
          style={styles.link}
          onClick={(e) => { e.preventDefault(); handleNavigation('/responses'); }} 
        >
          Responses
        </a>

        <a
          href="#"
          style={styles.link}
          onClick={(e) => { e.preventDefault(); handleNavigation('/notes'); }} 
        >
          Notes
        </a>
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
    justifyContent: 'flex-start',
    padding: '15px 30px',
    backgroundColor: '#000', // Black navbar
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Navbar;
