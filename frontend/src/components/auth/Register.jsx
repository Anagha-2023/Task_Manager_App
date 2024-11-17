import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.passwordUppercase = "Password must include at least one uppercase letter";
      }
      if (!/[a-z]/.test(formData.password)) {
        newErrors.passwordLowercase = "Password must include at least one lowercase letter";
      }
      if (!/\d/.test(formData.password)) {
        newErrors.passwordNumber = "Password must include at least one number";
      }
      if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.passwordSpecial = "Password must include at least one special character";
      }
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Password confirmation is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Always clear the specific field error when the user is typing
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(formData)).then((response) => {
        if(response.meta.requestStatus === 'fulfilled') {
          navigate('/login',{state:{registrationSuccess: true}})
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white border-2 border-blue-500 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.firstname ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.lastname ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {formData.password && errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          {formData.password && errors.passwordUppercase && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordUppercase}</p>
          )}
          {formData.password && errors.passwordLowercase && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordLowercase}</p>
          )}
          {formData.password && errors.passwordNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordNumber}</p>
          )}
          {formData.password && errors.passwordSpecial && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordSpecial}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        ) : (
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition font-medium"
          >
            Signup
          </button>
        )}

        <p className="text-center mt-3 mb-3">
          Already have an account? <span onClick={()=>navigate('/login')} className="text-blue-500 hover:cursor-pointer">Login</span>
        </p>
        <div className="text-center">
          <button className="bg-blue-500 p-2 rounded-md text-white font-medium">
            Signup with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
