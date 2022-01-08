import React from "react";
import type { FC } from "react";

interface Props {
  themeColour: string;
  themeTint: number;
}
const MobileNavigationWrapper: FC<Props> = ({ children, themeTint, themeColour }) => {
  return (
    <div className={`flex-1 flex flex-col bg-${themeColour}-${themeTint} h-full`}>
      <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
        <div className={`flex-1 space-y-1 bg-${themeColour}-${themeTint}`} aria-label="Sidebar">
          {children}
        </div>
      </div>
    </div>
  );
};

export { MobileNavigationWrapper };
