import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Carsoule from "../components/Carsoule";
import Meet from "../components/Meet";
import Footer from "../components/Footer";
import API from "../api/api";
import Cookies from "js-cookie";
import image1 from "../assets/Img1.jpg";
import image2 from "../assets/Img2.jpg";
import image3 from "../assets/Img3.jpg";
import ImgCarousel from "../components/ImgCarsoule";
import TherpistHome from "../components/TherpistHome";

const Home = () => {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const images = [image1, image2, image3];

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

  let content;
  if (role === "USER") {
    content = (
      <>
        <Carsoule />
        <Meet />
      </>
    );
  } else if (role === "THERAPIST") {
    content = (
      <>
        <ImgCarousel images={images} />
        <TherpistHome />
      </>
    );
  } else {
    content = (
      <>
        <Carsoule />
        <Meet />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />
      
      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-primary-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 origin-left-right"></div>
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="loading-dots mb-4">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="text-neutral-600 font-medium">Loading your wellness journey...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {content}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
