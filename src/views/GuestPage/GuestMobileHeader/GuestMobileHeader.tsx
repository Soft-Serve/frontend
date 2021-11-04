import React from "react";
import type { FC } from "react";
import { useGlobalContext } from "src/contexts";
import { useRestaurantQuery } from "@shared";
import { RestaurantLogo } from "@presentational";

const GuestMobileHeader: FC = ({ children }) => {
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
        </div>
      </div>
      {children}
    </div>
  );
};

export { GuestMobileHeader };
