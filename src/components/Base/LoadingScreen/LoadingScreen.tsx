import React from "react";
import type { FC } from "react";
import "./styles.css";

const LoadingScreen: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="loader flex space-x-3 rounded-full bg-gray-900 p-5">
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
      </div>
      <span className="mt-4 w-full text-center font-Quicksand text-xl">
        Loading page, we recommend you connect to the wifi to speed this up!
      </span>
    </div>
  );
};

export { LoadingScreen };
