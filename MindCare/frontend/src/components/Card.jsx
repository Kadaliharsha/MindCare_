import React, { useState, useEffect } from "react";
import Input from "./Input";
import API from "../api/api";
import image from "../assets/download.png";

const Card = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [email] = useState(userData.email);
  const [gender, setGender] = useState(userData.gender);
  const [isPicture, setIsPicture] = useState(Boolean(userData.profilePicture));
  const [uploadedImage, setUploadedImage] = useState(userData.profilePicture);
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    // If userData has a profile picture, set it
    if (userData.profilePicture) {
      setUploadedImage(userData.profilePicture);
      setIsPicture(true);
    }
  }, [userData]);

  const handleSave = async (field, value) => {
    try {
      const updatedData = {
        ...userData,
        [field]: value,
      };

      const response = await API.put(`/user/${email}`, updatedData);

      if (response.status === 200) {
        if (field === "name") setName(value);
        if (field === "age") setAge(value);
        if (field === "gender") setGender(value);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "photos");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwcqn9ilb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUploadedImage(result.url);

        // Only update the profile picture, not age or other fields
        const response2 = await API.put(`user/${email}`, {
          profilePicture: result.url,
        });

        if (response2.status === 200) {
          setIsPicture(true);
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="ml-[60px] w-[80%] h-[100%] bg-white drop-shadow-md rounded-md pt-10">
      <div
        className="bg-fuchsia-900 w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden m-auto mt-4 cursor-pointer mb-5"
        onClick={() => setIsEditPicture(true)} // Allow editing the picture
      >
        <img
          src={
            uploadedImage
              ? `${uploadedImage}?t=${Date.now()}` // Append timestamp to force reload
              : image
          }
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {isEditPicture && (
        <div className="mt-2 flex justify-center mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-white p-2 rounded cursor-pointer"
          />
          <button
            onClick={() => setIsEditPicture(false)} // Close image edit mode
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Done
          </button>
          <button
            onClick={() => {
              setIsEditPicture(false);
              setUploadedImage(userData.profilePicture); // Reset to original image if canceled
            }}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      )}

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onSave={() => handleSave("name", name)}
      />
      <Input
        label="Age"
        value={age}
        onChange={(e) => {
          const newAge = e.target.value;
          setAge(newAge); // Ensure we are correctly updating the age state
        }}
        onSave={() => handleSave("age", age)}
      />
      <Input
        label="Email"
        value={email}
        onChange={() => {}}
        onSave={() => {}}
      />
      <Input
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        onSave={() => handleSave("gender", gender)}
      />
    </div>
  );
};

export default Card;
