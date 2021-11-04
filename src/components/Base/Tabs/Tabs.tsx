import React from "react";
import type { FC } from "react";

const Tabs: FC = ({ children }) => {
  return (
    <div className="sm:block w-full">
      <nav
        className="relative z-0 rounded-md shadow-md flex divide-x divide-gray-300 justify-items-center items-center bg-white"
        aria-label="Tabs"
      >
        {children}
      </nav>
    </div>
  );
};

export { Tabs };
