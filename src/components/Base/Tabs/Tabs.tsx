import React from "react";
import type { FC } from "react";
interface Props {
  children: React.ReactNode;
}

const Tabs: FC<Props> = ({ children }) => {
  return (
    <div className="w-full sm:block">
      <nav
        className="relative z-0 flex items-center justify-items-center divide-x divide-gray-300 rounded-md bg-white shadow-md"
        aria-label="Tabs"
      >
        {children}
      </nav>
    </div>
  );
};

export { Tabs };
