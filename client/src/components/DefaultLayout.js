import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="main">
      
      <div className="header flex justify-between p-4 shadow items-center bg-slate-200 font-semibold text-lg">
        <h1>Music Player</h1>
        <div className="flex items-center gap-4">
            <h2>{user?.username.toUpperCase()}</h2>
            
            <i className="ri-logout-box-r-line curson-pointer" onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
              toast.success('User has been logged out');
            }}></i>

        </div>
      </div>
      
      <div className="container">{children}</div>

    </div>
  );
}

export default DefaultLayout;
