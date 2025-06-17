import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import API from "../api/api";

const FeedBack = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = Cookies.get("email");
    const userRole = Cookies.get("role");

    if (userEmail && userRole) {
      setRole(userRole);
      setIsLoggedIn(true);

      const fetchUserDetails = async () => {
        try {
          const response =
            userRole === "USER"
              ? await API.get(`/user/${userEmail}`)
              : await API.get(`/therapist/${userEmail}`);

          if (response.status === 200) {
            setUser(response.data.name); // Set the user name
            setAvatar(response.data.profilePicture || ""); // Set the avatar or fallback
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false); // If no email or role in cookies, stop loading
    }
  }, []);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />
      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-pink-500 origin-left-right"></div>
          </div>
        </div>
      ) : (
        <>
          <FeedbackForm />
          <Footer />
        </>
      )}
    </>
  );
};

export default FeedBack;
