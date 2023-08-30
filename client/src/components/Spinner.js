import React from "react";

function Spinner() {
  return (
    <div className="absolute inset-0 bg-slate-900 opacity-80 z-50 flex justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-6 border-gray-100 mt-20"></div>
    </div>
  );
}

export default Spinner;
