import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userObj = JSON.parse(user);
          if (userObj && userObj.name) {
            setUserName(userObj.name);
          }
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the Course_Page with search term as query parameter
    navigate(`/course?name=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUserName(null);
    window.location.replace("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left section: Logo and Learn Button */}
        <div className="flex items-center space-x-4">
          <div className="text-black text-lg font-bold"><a href='/'>SageSphere</a></div>
          <button className="text-black border border-black px-4 py-2 rounded hover:bg-zinc-700">
            <a href='/course'>Learn</a>
          </button>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 w-64 bg-white text-black rounded-md border border-black outline-black ring-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-2 text-black"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Right section: Home, Business, Login/User */}
        <div className="flex items-center space-x-4">
          <button className="text-black hover:text-gray-400"><a href='/'>Home</a></button>
          <a href='/job'><button className="text-black hover:text-gray-400">Business</button></a>

          {userName ? (
  <>
    <button
      onClick={() => navigate('/profile')} // Navigate to the profile page on click
      className="flex items-center space-x-2 text-white bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
    >
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7a4 4 0 118 0 4 4 0 01-8 0zM12 13v6m0 0H9m3 0h3m-1-3a4.992 4.992 0 00-4.95-5H7a4.992 4.992 0 00-5 5m15 0h-3a4.992 4.992 0 00-5 5m6-5h-3a4.992 4.992 0 00-5 5m10-5h-1.05A4.992 4.992 0 0012 14m6-4h-2.5A2.5 2.5 0 0115 9.5 2.5 2.5 0 0112.5 12H10m4-4H13a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 0013 15h2a2.5 2.5 0 002.5-2.5A2.5 2.5 0 0015 10z"
        />
      </svg>
      <span>Welcome, {userName}</span>
    </button>
    <button
      onClick={handleLogout}
      className="text-white bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700"
    >
      Logout
    </button>
  </>
) : (
  <a href="/login">
    <button className="text-white bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700">
      Login
    </button>
  </a>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
