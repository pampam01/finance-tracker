import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <div className="mt-4 text-lg">Loading...</div>
    </div>
  );
};

export default Loading;
