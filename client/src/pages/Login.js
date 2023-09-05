import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", user);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        console.log("User has been logged in successfully");

        // set userID token cookie in browser and send to the home page
        localStorage.setItem("token", response.data.data);
        navigate("/");
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error logging in user');
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-start justify-center text-center ">
      <div className="form-wrap flex flex-col p-5 mt-6 border border-gray-400">
        
        <h1 className="text-3xl font-bold mb-5 mt-1">Login</h1>
        
        <input 
          type="text"
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input 
          type="password"
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        
        <button
          className="border-2 border-gray-300 rounded-md p-2 m-2 bg-sky-300 hover:bg-sky-500"
          onClick={login}>Login</button>

        <Link to="/register" className="text-gray-600 underline">Register</Link>
      </div>

    </div>
  );
}

export default Login;
