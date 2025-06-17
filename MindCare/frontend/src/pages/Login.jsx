import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./login.css";
import Image from "../assets/login.jpg";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API, { setBasicAuth } from "../api/api.js";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", loginCredentials);

      if (response.status === 200) {
        console.log(response);
        const email = loginCredentials.email;
        const roles = response.data.roles;
        const userName = response.data.name;

        Cookies.set("email", email, { path: "/", expires: 7 });
        Cookies.set("role", roles, { path: "/", expires: 7 });
        Cookies.set("userName", userName, { path: "/", expires: 7 });

        if (roles[0] === "USER") {
          window.location.href = "/userDb";
        } else if (roles[0] === "THERAPIST") {
          window.location.href = "/therapistDb";
        } else {
          alert("Invalid role.");
          console.log(response);
        }
      }
    } catch (error) {
      alert("Login failed: " + error.response.data);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={Image}
          alt="Mental wellness illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20"></div>
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-3xl font-display font-bold mb-4">
            Welcome to MindCare
          </h2>
          <p className="text-lg opacity-90">
            Your journey to mental wellness starts here. Connect with compassionate 
            professionals who understand and support your emotional well-being.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <img src={Logo} alt="MindCare Logo" className="w-16 h-16 mx-auto animate-scale-in" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-600">
              Sign in to continue your wellness journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-neutral-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginCredentials.email}
                onChange={handleInput}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-neutral-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginCredentials.password}
                  onChange={handleInput}
                  required
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {message && (
              <div className="text-error-600 text-sm bg-error-50 border border-error-200 rounded-lg p-3">
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-lg py-4"
            >
              Sign In
            </button>

            <div className="text-center">
              <p className="text-neutral-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-xs font-bold">ℹ</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary-900 mb-1">
                  Need Immediate Support?
                </h4>
                <p className="text-xs text-primary-700">
                  If you're experiencing a crisis, please contact emergency services 
                  or visit our <Link to="/sos" className="underline font-medium">Emergency Support</Link> page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
