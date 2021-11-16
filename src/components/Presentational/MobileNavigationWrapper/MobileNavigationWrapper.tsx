import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "@contexts";

const MobileNavigationWrapper: FC = ({ children }) => {
  const { themeColour, themeTint } = useRestaurantContext();

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
