import React from "react";
import type { FC } from "react";

const BreadCrumbsNavigation: FC = ({ children }) => {
  return (
    <nav aria-label="Breadcrumb" className="p-3 rounded-lg w-full mb-4 overflow-x-scroll">
      {children}
    </nav>
  );
};

export { BreadCrumbsNavigation };
