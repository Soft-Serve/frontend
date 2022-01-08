import React from "react";
import type { FC } from "react";
import "./styles.css";

const LoadingScreen: FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="loader bg-gray-900 p-5 rounded-full flex space-x-3">
        <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
      </div>
      <span className="mt-4 text-xl font-Quicksand w-full text-center">
        Loading page, this might take a minute...
      </span>
    </div>
  );
};

export { LoadingScreen };
