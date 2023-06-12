import React from "react";

function Register() {
  return (
    <div className="flex min-h-screen items-start justify-center">
      <div>
        <input type="text" placeholder="Username" className="border-2 border-gray-300 rounded-md p-2 m-2" />
        <input type="text" placeholder="Email" className="border-2 border-gray-300 rounded-md p-2 m-2" />
        <input type="password" placeholder="Password" className="border-2 border-gray-300 rounded-md p-2 m-2" />
        <input type="password" placeholder="Confirm Password" className="border-2 border-gray-300 rounded-md p-2 m-2" />
        <button className="border-2 border-gray-300 rounded-md p-2 m-2">Register</button>
      </div>
    </div>
  );
}

export default Register;
