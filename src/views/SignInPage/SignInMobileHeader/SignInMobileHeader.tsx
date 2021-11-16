import React from "react";
import type { FC } from "react";

import { RestaurantLogo } from "@presentational";
import { MenuIcon } from "@heroicons/react/solid";

interface Props {
  onButtonClick: any;
}

const SignInMobileHeader: FC<Props> = ({ onButtonClick, children }) => {
  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div className="lg:hidden">
        <div className="bg-red-400 py-2 px-4 flex items-center justify-between sm:px-6">
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-red-400 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => onButtonClick(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { SignInMobileHeader };
