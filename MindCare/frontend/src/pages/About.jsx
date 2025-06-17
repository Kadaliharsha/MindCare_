import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import API from "../api/api";
import Cookies from "js-cookie";
import Team1 from "../assets/team1.png";
import Team2 from "../assets/team2.png";
import Team3 from "../assets/team3.png";
import Team4 from "../assets/team4.png";
import AboutUs from "../components/AboutUs";

const About = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
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
            setUser(response.data.name);
            setAvatar(response.data.profilePicture || "");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false);
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
        <div className="flex justify-center items-center h-screen">
          <div className="loader" />
        </div>
      ) : (
        <>
          <AboutUs />
          <Footer />
        </>
      )}
    </>
  );
};

export default About;
