import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";

import { RestaurantLogo } from "@presentational";
import { MenuIcon } from "@heroicons/react/solid";
import { Button } from "@base";

interface Props {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const SignInMobileHeader: FC<Props> = ({ setMobileMenuOpen, children }) => {
  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div className="lg:hidden">
        <div className="bg-red-400 py-2 px-4 flex items-center justify-between sm:px-6">
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
          </div>

          <div className="flex items-center">
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

export { SignInMobileHeader };
