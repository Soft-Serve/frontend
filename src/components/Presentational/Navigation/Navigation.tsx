import React from "react";
import type { FC } from "react";
import { RestaurantLogo } from "@presentational";
import { useGlobalContext } from "src/contexts";

const Navigation: FC = ({ children }) => {
  const { themeColour, themeTint } = useGlobalContext();
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col">
        <div
          className={`flex flex-col h-0 flex-1 overflow-y-auto bg-${themeColour}-${themeTint}  w-30`}
        >
          <div className="flex-1 flex flex-col">
            <div
              className={`"flex-shrink-0 bg-${themeColour}-${themeTint} py-4 flex items-center justify-center w-52`}
            >
              <RestaurantLogo dimensions={70} />
            </div>
            <nav aria-label="Sidebar" className="py-6 flex flex-col items-center">
              {children}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
