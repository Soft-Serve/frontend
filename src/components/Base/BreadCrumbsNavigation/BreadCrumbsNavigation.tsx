import React from "react";
import type { FC } from "react";

const BreadCrumbsNavigation: FC = ({ children }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 w-full overflow-x-scroll rounded-lg p-3">
      {children}
    </nav>
  );
};

export { BreadCrumbsNavigation };
