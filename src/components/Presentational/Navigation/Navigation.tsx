import React from "react";
import type { FC } from "react";
import { RestaurantLogo } from "@presentational";
import { Link } from "react-router-dom";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  children: React.ReactNode;
}
const Navigation: FC<Props> = ({ children, themeTint, themeColour, restaurantSlug }) => {
  return (
    <div className="hidden lg:flex  lg:flex-shrink-0">
      <div className="flex flex-col">
        <div className={`flex h-0 flex-1 flex-col overflow-y-auto bg-${themeColour}-${themeTint}`}>
          <div className="flex flex-1 flex-col">
            <Link className="flex" to={`/restaurants/${restaurantSlug}`}>
              <div
                className={`"flex-shrink-0 bg-${themeColour}-${themeTint} flex w-32  items-center justify-center py-4`}
              >
                <RestaurantLogo restaurantSlug={restaurantSlug} dimensions={70} />
              </div>
            </Link>
            <nav aria-label="Sidebar" className="flex flex-col items-center py-6">
              {children}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
