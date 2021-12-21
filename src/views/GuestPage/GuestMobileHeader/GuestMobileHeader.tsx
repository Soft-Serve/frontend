import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "src/contexts";
import { CURRENT_USER_QUERY, useCurrentUserQuery, useSignOutMutation } from "@shared";
import { Button } from "@base";
import { RestaurantLogo } from "@presentational";
import { AdjustmentsIcon, FilterIcon, LoginIcon, LogoutIcon } from "@heroicons/react/solid";
import { routes } from "@routes";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
}

const GuestMobileHeader: FC<Props> = ({
  children,
  setIsFilterSideMenuOpen,
  setIsMenuSlideOverOpen,
}) => {
  const { themeColour, themeTint, themeFont, restaurantSlug } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
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

  const renderAuthButton = () => {
    if (!data?.currentUser) {
      return (
        <Link to={routes.signIn}>
          <Button size="XL" css="mr-2" colour="accent">
            <LoginIcon className="h-6 w-6 " />
            <span className="sr-only">Sign in</span>
          </Button>
        </Link>
      );
    }
    return (
      <Button size="XL" css="mr-2" colour="accent" onClick={signUserOut}>
        <LogoutIcon className="h-6 w-6 " />
        <span className="sr-only">Sign out</span>
      </Button>
    );
  };

  const renderSettingsButton = () => {
    if (!data?.currentUser) return null;
    return (
      <Link to={`${routes.settings}/${restaurantSlug}/restaurant`}>
        <Button size="XL" css="mr-2" colour="accent">
          <AdjustmentsIcon className="h-6 w-6 " />
          <span className="sr-only">Settings</span>
        </Button>
      </Link>
    );
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 flex items-center justify-between sm:px-6`}
        >
          <div className="items-center sm:flex hidden">
            <RestaurantLogo dimensions={50} />
          </div>
          <div className="flex items-center justify-end w-full ml-2">
            <Button
              size="XL"
              themeFont={themeFont}
              css="mr-2"
              colour="accent"
              onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
            >
              <FilterIcon className="h-6 w-6 " />
              <span className="sr-only">Filters List</span>
            </Button>
            <Button
              size="XL"
              themeFont={themeFont}
              css="mr-2"
              colour="accent"
              onClick={() => setIsMenuSlideOverOpen(prevState => !prevState)}
            >
              Menus
              <span className="sr-only">Open Menus List</span>
            </Button>
            {renderSettingsButton()}
            {renderAuthButton()}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { GuestMobileHeader };
