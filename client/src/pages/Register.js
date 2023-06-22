import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const register = async () => {
    try {
      const response = await axios.post("/api/users/register", user);
      if (response.data.success) {
        alert("User has been registered successfully");
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
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
        />
        <input 
          type="password" 
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
        />
        <input 
          type="password" 
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          className="text-center border-2 border-gray-300 rounded-md p-2 m-2"
        />
        
        <button
          onClick={register} className="border-2 border-gray-300 rounded-md p-2 m-2 bg-sky-300">Register</button>
      </div>
    </div>
  );
}

export default Register;
