import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import Footer from '../components/Footer'; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Job = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Become an Educator</h1>
          <p className="mb-6 text-lg text-gray-700">
            Share your knowledge and skills with eager learners. Join our community of educators and start making an impact today!
          </p>
          <Link to="/educator-courses">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Job;
