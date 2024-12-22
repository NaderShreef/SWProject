'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');  // State for storing email input
  const [password, setPassword] = useState('');  // State for storing password input
  const [errorMessage, setErrorMessage] = useState('');  // State for error message if login fails
  const router = useRouter();  // To redirect after successful login

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent page refresh on form submission

    try {
      // Send POST request to the backend with email and password
      const response = await axios.post('\backend\src\Auth\auth.controller.ts', {
        email,
        password,
      });

      // Assuming the backend returns a token upon successful login
      if (response.data.token) {
        // Store the token (or any other response data you need) in localStorage or context
        localStorage.setItem('authToken', response.data.token);

        // Redirect to the home page or any other page after successful login
        router.push('/home');
      }
    } catch (error) {
      // Handle errors, e.g., invalid credentials
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.loginForm}>
        <h1>Login</h1>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}  {/* Show error message if login fails */}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
};
