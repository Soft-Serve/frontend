import React from "react";
import type { FC } from "react";

const SettingsBreadCrumbs: FC = ({ children }) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-blue-gray-200 lg:hidden">
      <div className="max-w-3xl mx-auto py-3 px-4 flex flex-col items-start sm:px-6 lg:px-8 h-full overflow-y-auto flex-1">
        {children}
      </div>
    </nav>
  );
};

export { SettingsBreadCrumbs };
