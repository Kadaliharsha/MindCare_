import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import "../main.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = Cookies.get("email");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get(`/appointments/user/${userEmail}`);
        if (response.status === 200) {
          setAppointments(response.data);
          console.log(response.data);
        }
      } catch (err) {
        setError("Error fetching appointments.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-5 w-full flex justify-center mb-[100px]">
      <div className="w-[90%]">
        <h2 className="text-5xl font-semibold mb-8 text-center text-[#109948]">
          My Appointments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="w-[450px] h-[350px] bg-white shadow-md border p-11 flex flex-col justify-evenly"
              >
                <div className="text-[16px] text-gray-600">
                  <strong>Name:</strong> {appointment.name}
                </div>
                <div className="text-[16px] text-gray-600">
                  <strong>Email:</strong> {appointment.email}
                </div>
                <div className="text-[18px] text-gray-600  mb-2">
                  <strong className="mr-2">Date:</strong>
                  {appointment.date}
                </div>
                <div className="text-[18px] mb-2 text-gray-700">
                  <strong>Message:</strong>{" "}
                  <span className="ml-2">{appointment.message}</span>
                </div>
                <div className="text-left text-[18px] text-gray-700 font-semibold">
                  Status:{" "}
                  <span
                    className={`${
                      appointment.status === "Accepted"
                        ? "text-green-600"
                        : appointment.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    } ml-2`}
                  >
                    {appointment.status}
                  </span>
                </div>
                {appointment.therapistEmail ? (
                  <div className="text-[18px] text-gray-700 mb-2">
                    <strong>Consultanted by :</strong>{" "}
                    <span>{appointment.therapistEmail}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserAppointments;
