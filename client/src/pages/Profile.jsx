import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import adminImage from "../assets/admin.png" // Adjust the path as necessary

const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 md:px-12 py-8 gap-4 text-white min-h-screen">
      {/* If NOT logged in (Profile is null/undefined) */}
      {!Profile ? (
        <div className="min-h-screen text-white flex items-center justify-between px-4 py-16">
          <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left Side */}
            <div className="max-w-xl">
              <h1 className="text-6xl md:text-5xl font-bold text-yellow-200 mb-6">
                Admin Access Only
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                If you are an admin, please log in with your admin credentials to
                manage the platform securely.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="w-full md:w-1/2">
              <img
                src={adminImage}
                alt="Admin illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      ) : (
        // If logged in (Profile exists)
        <div className="gap-4 flex flex-col lg:flex-row">
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
              <Sidebar data={Profile} />
              <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      )}

      {/* Optional: loader while checking Profile */}
      {Profile === null && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );

};

export default Profile;
