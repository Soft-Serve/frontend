import React from "react";
import type { FC } from "react";
import { RestaurantLogo } from "@presentational";
import { MenuIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "@contexts";

interface Props {
  onButtonClick: any;
}

const SettingsMobileHeader: FC<Props> = ({ onButtonClick, children }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 px-4 flex items-center justify-between sm:px-6`}
        >
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
            <div className="ml-4">
              <h2 className="text-2xl text-white font-semibold">Settings</h2>
            </div>
          </div>
          <button
            type="button"
            className={`-mr-3 h-12 w-12 inline-flex items-center justify-center bg-${themeColour}-${themeTint} rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            onClick={() => onButtonClick(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export { SettingsMobileHeader };
