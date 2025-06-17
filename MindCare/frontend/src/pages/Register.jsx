import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import API from "../api/api";
import "./login.css";
import Image1 from "../assets/signup(1).jpg";
import Image2 from "../assets/therpist.jpg";
import Logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTherapist, setIsTherapist] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Separate state for user and therapist credentials
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
  });

  const [therapistCredentials, setTherapistCredentials] = useState({
    email: "",
    password: "",
    name: "",
    licenceNo: "",
    specialization: "",
  });

  useEffect(() => {
    setIsTherapist(location.pathname === "/signup/therapist");
  }, [location.pathname]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (isTherapist) {
      setTherapistCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserCredentials((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = isTherapist ? therapistCredentials : userCredentials;

    if (credentials.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const endpoint = isTherapist
        ? "/auth/signUp/therapist"
        : "/auth/signUp/user";

      const response = await API.post(endpoint, credentials);
      console.log(response.data.message || "Signup successful!");

      // Reset form
      setUserCredentials({
        email: "",
        password: "",
        name: "",
        age: "",
        gender: "",
      });
      setTherapistCredentials({
        email: "",
        password: "",
        name: "",
        licenceNo: "",
        specialization: "",
      });
      setConfirmPassword("");
      setMessage("");

      navigate("/login");
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="left-image">
        <img
          src={isTherapist ? Image2 : Image1}
          alt="signup illustration"
          className="w-full h-full object-fit"
        />
      </div>
      <div className="right">
        <div className="mb-5 mt-5">
          <img src={Logo} alt="Logo" className="w-[60px] m-auto" />
        </div>
        <div className="w-[100%] h-[50px] text-[30px] font-semibold text-[#109948] text-center mb-[20px]">
          <h2>Sign up as {isTherapist ? "Therapist" : "User"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-[100%] h-[350px] relative">
          <div className="w-[450px] h-[30px] m-auto">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                isTherapist ? therapistCredentials.email : userCredentials.email
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
          </div>
          <div className="w-[450px] h-[30px] m-auto mt-[40px] flex justify-between gap-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                isTherapist ? therapistCredentials.name : userCredentials.name
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            <input
              type={isTherapist ? "text" : "number"}
              name={isTherapist ? "specialization" : "age"}
              placeholder={isTherapist ? "Specialization" : "Age"}
              value={
                isTherapist
                  ? therapistCredentials.specialization
                  : userCredentials.age
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
          </div>
          {isTherapist && (
            <div className="w-[450px] h-[30px] m-auto mt-[40px]">
              <input
                type="text"
                name="licenceNo"
                placeholder="License/Registration Number"
                value={therapistCredentials.licenceNo}
                onChange={handleInput}
                className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
              />
            </div>
          )}
          <div className="w-[450px] h-[30px] m-auto mt-[40px] relative ">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={
                isTherapist
                  ? therapistCredentials.password
                  : userCredentials.password
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            {showPassword1 ? (
              <FaEyeSlash
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute top-[64%] right-[5%] text-[#109948] text-[20px]"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            )}
          </div>
          <div className="w-[450px] h-[30px] m-auto mt-[40px] relative">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            {showPassword2 ? (
              <FaEyeSlash
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-[64%] right-[5%] text-[#109948] text-[20px]"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            )}
          </div>
          {message && (
            <p
              className={
                isTherapist
                  ? " absolute top-[100%] right-[17%] text-[14px] text-red-500"
                  : "absolute top-[79%] right-[17%] text-[14px] text-red-500"
              }
            >
              {message}
            </p>
          )}
          {!isTherapist && (
            <div className=" absolute top-[85%] left-[16%]">
              <label className="text-[18px] text-[#d6d5d5]">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userCredentials.gender === "Male"}
                  onChange={handleInput}
                  className=" accent-[#109948] w-[25px] h-[18px]"
                />
                Male
              </label>
              <label className="text-[18px] text-[#d6d5d5] ">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userCredentials.gender === "Female"}
                  onChange={handleInput}
                  className=" accent-[#109948] ml-[295px] w-[25px] h-[18px]"
                />
                Female
              </label>
            </div>
          )}
          <div
            className={
              isTherapist
                ? "absolute top-[108%] left-[26.5%]"
                : " absolute top-[102%] left-[26.5%]"
            }
          >
            <button
              type="submit"
              className="w-[300px] h-[50px] rounded-[30px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div
          className={
            isTherapist
              ? "absolute top-[89%] right-[18%] text-[14px]"
              : "absolute top-[86%] right-[18%] text-[14px] "
          }
        >
          <p className="">
            Already have an account?{" "}
            <Link to="/login" className="text-[#008055]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
