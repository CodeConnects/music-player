import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";

import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({children}) {
  const {user} = useSelector((state) => state.user);
  const [readyRender, setReadyRender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/get-user-data", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        // move to redux reducer ~ setUserData(response.data.data);
        dispatch(SetUser(response.data.data));
        //console.log(response.data.data);
      }
      else {
        alert(response.data.message);
      }
      setReadyRender(true);
      //console.log(response.data);
    } catch (error) {
      // remove token cookie and send to login page if error
      dispatch(HideLoading());
      localStorage.removeItem("token");
      setReadyRender(true);
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user === null) {
      getUserData();
    }
  }, []);


  return (
    <div>{readyRender && <DefaultLayout>{children}</DefaultLayout>}</div>
  );
}

export default ProtectedRoute;
