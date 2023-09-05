import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async () => {
    //console.log(user);
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", user);
      dispatch(HideLoading());

      if (response.data.success) {
        //localStorage.setItem("token", response.data.data);
        console.log("User has been registered successfully " + user);
        toast.success(response.data.message);
        navigate("/login");
      } 
      else {
        toast.error(response.data.message);
        //alert(response.data.message);
      }
    } catch (error) {
      toast.error('Error registering user');
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-start justify-center text-center ">
      <div className="form-wrap flex flex-col p-5 mt-6 border border-gray-400 bg-">
        
        <h1 className="text-3xl font-bold mb-5 mt-1">Register</h1>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={user.username} 
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
        />
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
          onClick={register}>Register</button>
        <Link to="/login" className="text-gray-600 underline">Login</Link>
      </div>
    </div>
  );
}

export default Register;
