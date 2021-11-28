import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";
import { RestaurantLogo } from "@presentational";
import { BookOpenIcon, MenuIcon } from "@heroicons/react/solid";
import { Button } from "@base";

interface Props {
  setIsGuestNavigationOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
}

const GuestMobileHeader: FC<Props> = ({
  children,
  setIsGuestNavigationOpen,
  setIsMenuSlideOverOpen,
}) => {
  const { themeColour, themeTint } = useRestaurantContext();

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 px-4 flex items-center justify-between sm:px-6`}
        >
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
          </div>
          <div>
            <Button
              css="mr-2"
              colour="accent"
              onClick={() => setIsMenuSlideOverOpen(prevState => !prevState)}
            >
              <span className="sr-only">Open Menus List</span>
              <BookOpenIcon className="h-6 w-6" />
              <span className="ml-2">Menus</span>
            </Button>
            <Button
              colour="accent"
              onClick={() => setIsGuestNavigationOpen(prevState => !prevState)}
            >
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

export { GuestMobileHeader };
