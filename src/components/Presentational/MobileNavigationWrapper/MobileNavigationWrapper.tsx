import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const MobileNavigationWrapper: FC<Props> = ({ children }) => {
  return (
    <div className={`flex h-full flex-1 flex-col bg-slate-50`}>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        <div className={`flex-1 space-y-1 bg-slate-50`} aria-label="Sidebar">
          {children}
        </div>
      </div>
    </div>
  );
};

export { MobileNavigationWrapper };
