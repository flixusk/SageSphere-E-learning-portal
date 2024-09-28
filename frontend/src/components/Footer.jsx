import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Help & Support</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Settings</a>
        </div>

        {/* Logo at the bottom */}
        <div className="mt-6">
          <div className="text-lg font-bold"><a href='/'>SageSphere</a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
