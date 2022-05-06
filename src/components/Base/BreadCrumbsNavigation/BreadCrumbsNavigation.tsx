import React from "react";
import type { FC } from "react";
interface Props {
  children: React.ReactNode;
}
const BreadCrumbsNavigation: FC<Props> = ({ children }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 w-full overflow-x-scroll rounded-lg p-3">
      {children}
    </nav>
  );
};

export { BreadCrumbsNavigation };
