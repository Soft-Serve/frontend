import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { RestaurantLogo } from "@presentational";
import { AdjustmentsIcon, MenuIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "@contexts";
import { Button } from "@base";

interface Props {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsSubNavOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsMobileHeader: FC<Props> = ({ setIsSubNavOpen, setMobileMenuOpen, children }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 px-4 flex items-center justify-between sm:px-6`}
        >
          <div className="flex items-center mr-2">
            <RestaurantLogo dimensions={50} />
            <div className="ml-4">
              <h2 className="text-2xl text-white font-semibold">Settings</h2>
            </div>
          </div>
          <div className="flex w-full justify-end ml-2">
            <Button
              css="mr-4"
              colour="accent"
              onClick={() => setIsSubNavOpen(prevState => !prevState)}
            >
              <span className="sr-only">Open sidebar</span>
              <AdjustmentsIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button colour="accent" onClick={() => setMobileMenuOpen(prevState => !prevState)}>
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { SettingsMobileHeader };
