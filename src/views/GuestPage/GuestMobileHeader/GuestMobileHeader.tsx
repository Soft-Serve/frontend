import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { useGlobalContext } from "src/contexts";
import { useRestaurantQuery } from "@shared";
import { RestaurantLogo } from "@presentational";
import { MenuIcon } from "@heroicons/react/solid";

interface Props {
  setIsGuestNavigationOpen: Dispatch<SetStateAction<boolean>>;
}

const GuestMobileHeader: FC<Props> = ({ children, setIsGuestNavigationOpen }) => {
  const { restaurantSlug, themeColour, themeTint } = useGlobalContext();
  const { data } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });

  const restaurantName = data?.restaurant.name;

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 px-4 flex items-center justify-between sm:px-6`}
        >
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
            {restaurantName && (
              <div className="ml-4">
                <h2 className="text-2xl text-white font-semibold">{restaurantName}</h2>
              </div>
            )}
          </div>
          <button
            type="button"
            className={`-mr-3 h-12 w-12 inline-flex items-center justify-center bg-${themeColour}-${themeTint} rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            onClick={() => setIsGuestNavigationOpen(prevState => !prevState)}
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

export { GuestMobileHeader };
