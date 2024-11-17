import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for a success message in the state from navigation
    if (location.state?.registrationSuccess) {
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000); // Hide popup after 3 seconds
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {showSuccessPopup && (
          <div className="absolute top-10  mb-4 p-2 text-white bg-green-500 rounded-md text-center">
            Registration successful! Please login.
          </div>
        )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white border-2 border-blue-500 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Login</h2>

        

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        ) : (
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition font-medium"
          >
            Login
          </button>
        )}
 
        <p className="text-center mt-3 mb-3 ">
          Don't have an account? <span onClick={() =>navigate('/register')} className="text-blue-500 hover:cursor-pointer">Signup</span>
        </p>
        <div className="text-center">
          <button className="bg-blue-500 p-2 rounded-md text-white font-medium">
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
