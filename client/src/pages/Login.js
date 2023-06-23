import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        alert("User has been logged in successfully");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex min-h-screen items-start justify-center text-center ">
      <div className="flex flex-col p-5 mt-6 border border-gray-400">
        
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
