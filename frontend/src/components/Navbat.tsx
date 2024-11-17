import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogin, onSignup }) => {
  const navigate = useNavigate()
  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between fixed top-0 w-full shadow-md z-10">
      {/* Left Section with To-Do List Image Icon */}
      <div className="flex items-center">
        <img
          src="/assets/images/to-do-list.png"  // Correct path to the image inside public/assets/images
          alt="Task Icon"
          className="w-8 h-8"  // Adjust size if needed
        />
      </div>

      {/* Right Section with Login/Signup Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="text-blue-500 bg-white font-medium px-4 py-1 rounded hover:bg-blue-600 hover:text-gray-200 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="text-blue-500 font-medium bg-white px-4  rounded hover:bg-blue-600 hover:text-gray-200 transition duration-300"
        >
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
