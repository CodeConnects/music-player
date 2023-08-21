import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center p-10">
      <div className="text-center form-wrap flex flex-col p-10 mt-6 border border-gray-400">
        <h1 className="text-4xl font-bold p-4">Home</h1>
        <hr className="p-2" />
        <Link to="/register" className="text-gray-600 underline p-2">Register</Link>
        <Link to="/login" className="text-gray-600 underline">Login</Link>
      </div>
    </div>
  );
}

export default Home;
