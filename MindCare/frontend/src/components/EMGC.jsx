import React, { useState, useEffect } from "react";
import ADDE from "./ADDE";
import ShowE from "./ShowE";
import API from "../api/api";
import Cookies from "js-cookie";

const EMGC = () => {
  const [contacts, setContacts] = useState([]);
  const userEmail = Cookies.get("email");

  // Fetch contacts from backend
  const fetchContacts = async () => {
    if (!userEmail) return;

    try {
      const response = await API.get(`/emergency-contacts/user/${userEmail}`);
      if (response.status === 200) {
        setContacts(response.data.contacts || []); // Set an empty array if no contacts found
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]); // Ensure contacts is initialized even on error
    }
  };

  useEffect(() => {
    if (!userEmail) {
      alert("No user logged in!");
      return;
    }
    fetchContacts(); // Initial fetch when component mounts
  }, [userEmail]);

  // Function to add new contact
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = async (phoneNumber, relationship) => {
    try {
      const response = await API.delete(
        `/emergency-contacts/delete/${userEmail}`,
        { params: { phoneNumber, relationship } }
      );

      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.filter(
            (contact) =>
              contact.phoneNumber !== phoneNumber ||
              contact.relationship !== relationship
          )
        );
        alert("Contact deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  return (
    <>
      <ADDE addContact={addContact} /> {/* Pass addContact function to ADDE */}
      <ShowE contacts={contacts} deleteContact={deleteContact} />{" "}
      {/* Pass deleteContact function to ShowE */}
    </>
  );
};

export default EMGC;
