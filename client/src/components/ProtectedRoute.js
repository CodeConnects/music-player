import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {
  const [readyRender, setReadyRender] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const getUserData = async () => {
    try {
      const response = await axios.post("/api/users/get-user-data", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setUserData(response.data.data);
        //console.log(response.data.data);
      }
      else {
        alert(response.data.message);
      }
      setReadyRender(true);
      //console.log(response.data);
    } catch (error) {
      // remove token cookie and send to login page if error
      localStorage.removeItem("token");
      setReadyRender(true);
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userData === null) {
      getUserData();
    }
  }, []);


  return (
    <div>{readyRender ? children : <div>Loading...</div>}</div>
  );
}

export default ProtectedRoute;
