import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

// Images (import your images here or use external URLs)
import Image1 from '/assets/banner_1.png';
import Image2 from '/assets/banner_2.png';
import Image3 from '/assets/banner_3.png';

// Company logos
import Logo1 from '/assets/slider/1.png';
import Logo2 from '/assets/slider/2.png';
import Logo3 from '/assets/slider/3.png';
import Logo4 from '/assets/slider/4.png';

const images = [Image1, Image2, Image3];
const logos = [Logo1, Logo2, Logo3, Logo4];

const reviews = [
  {
    name: "John Doe",
    review: "This platform has transformed my career. The courses are top-notch!",
  },
  {
    name: "Jane Smith",
    review: "An incredible learning experience. Highly recommend it to everyone!",
  },
  {
    name: "Sam Wilson",
    review: "The quality of education and the support is excellent. Worth every penny!",
  },
  {
    name: "Alice Johnson",
    review: "A game-changer for my professional skills. The variety of courses is impressive.",
  },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Image Banner with default image size */}
      <div className="relative max-w-7xl mx-auto pt-4">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="w-auto h-auto object-contain transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Main Content with centered layout */}
      <main className="">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6'>
          <h2 className="text-2xl font-bold underline">All the skills you need in one place</h2>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6'>
          <h2 className='text-4xl'>Welcome to SageSphere</h2>
          <h3 className='text-2xl'>Unlock Your Potential!</h3>
          <h4 className='text-lg'>Empower your learning journey with our diverse range of courses, expert instructors, and interactive materials. Join a community of learners and elevate your skills in a flexible, engaging environment.</h4>
        </div>
        
        <div className='bg-zinc-100 w-full -mx-4 px-4 py-8 '>
        <div className="text-lg text-center mb-8">
          Take online courses from 260+ world-class universities and companies
        </div>
        
        {/* Company Logos */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center w-32 h-16">
              <img
                src={logo}
                alt={`Company Logo ${index + 1}`}
                className="w-auto h-full object-contain"
              />
            </div>
          ))}
        </div>

        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-start space-y-6'>
          <h2 className="text-lg font-medium">Discover the success stories driven by learning.</h2>
          
          {/* Review Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-zinc-100'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-col'>
    <div className='w-1/4 text-left text-5xl font-bold'>
      Be part of a thriving network, not just a course
    </div>
    <div className='w-2/4 text-left text-lg pt-5'>
      With us, you gain more than just knowledge. Expect long-term growth with valuable credentials, career support, 
      and access to top experts. Choose flexible learning options and 
      connect with a global community of professionals advancing in their fields.
    </div>
  </div>
</div>
<div>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 flex-col text-center justify-center'>
    <h1 className='text-5xl font-bold'>Register for a Free account!</h1>
    <h2 className='text-lg py-5 '>Sign up! now</h2>
    <a href='/login'><button className='text-white bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700'>Login</button></a>
  </div>
</div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
