import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { RestaurantLogo } from "@presentational";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "@contexts";
import { Button } from "@base";
import { routes } from "@routes";
import { CURRENT_USER_QUERY, useSignOutMutation } from "@shared";
import { useViewport } from "@hooks";

interface Props {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsSubNavOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsMobileHeader: FC<Props> = ({ setIsSubNavOpen, children }) => {
  const { themeColour, themeTint, restaurantSlug } = useRestaurantContext();
  const { width } = useViewport();
  const isLargerThenSmallMobile = width > 410;
  const buttonSize = isLargerThenSmallMobile ? "LG" : "S";
  const [signOut] = useSignOutMutation({
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  });
  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    window.location.assign(routes.signIn);
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 flex items-center justify-between sm:px-6`}
        >
          <div className="items-center sm:flex hidden">
            <RestaurantLogo dimensions={50} />
          </div>
          <div className="flex items-center justify-end w-full ml-2">
            <Link to={`${routes.restaurants}/${restaurantSlug}`}>
              <Button css="mr-2" size={buttonSize} colour="accent">
                Menus
              </Button>
            </Link>
            <Button
              size={buttonSize}
              css="mr-2"
              colour="accent"
              onClick={() => setIsSubNavOpen(prevState => !prevState)}
            >
              <span className="sr-only">Open SettingsMenu</span>
              Settings
            </Button>

            <Button css="mr-2" size={buttonSize} colour="accent" onClick={signUserOut}>
              Sign Out
              <span className="sr-only">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { SettingsMobileHeader };
