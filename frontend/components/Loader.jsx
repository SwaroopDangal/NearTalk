import React from "react";
import { Loader2 } from "lucide-react";

const LoaderComponent = ({ message = "Loading...", fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          </div>
          <p className="text-white text-lg font-medium">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoaderComponent;
