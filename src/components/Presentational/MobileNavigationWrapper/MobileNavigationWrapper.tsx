import React from "react";
import type { FC } from "react";

interface Props {
  themeColour: string;
  themeTint: number;
}
const MobileNavigationWrapper: FC<Props> = ({ children, themeTint, themeColour }) => {
  return (
    <div className={`flex flex-1 flex-col bg-${themeColour}-${themeTint} h-full`}>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        <div className={`flex-1 space-y-1 bg-${themeColour}-${themeTint}`} aria-label="Sidebar">
          {children}
        </div>
      </div>
    </div>
  );
};

export { MobileNavigationWrapper };
