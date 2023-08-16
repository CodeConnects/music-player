import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null);
  
  const getUserData = async () => {
    try {
      const response = await axios.post("/api/users/get-user-data", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setUserData(response.data.data);
        console.log(response.data.data);
      }
      else {
        alert(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData === null) {
      getUserData();
    }
  }, []);

  return (
    <div className="flex justify-center p-10">
      <div className="text-center form-wrap flex flex-col p-10 mt-6 border border-gray-400">
        <h1 className="text-4xl font-bold p-4">Hello {userData?.username}</h1>
        <hr className="p-2" />
        <Link to="/register" className="text-gray-600 underline p-2">Register</Link>
        <Link to="/login" className="text-gray-600 underline">Login</Link>
      </div>
    </div>
  );
}

export default Home;
