import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurantContext } from "src/contexts";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { Button } from "@base";
import { RestaurantLogo } from "@presentational";
import { routes } from "@routes";
import { useViewport } from "src/hooks";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
}

const MainMobileHeader: FC<Props> = ({
  children,
  setIsFilterSideMenuOpen,
  setIsMenuSlideOverOpen,
}) => {
  const navigate = useNavigate();
  const { themeColour, themeTint, themeFont, restaurantSlug } = useRestaurantContext();
  const { width } = useViewport();
  const isLargerThenSmallMobile = width > 410;
  const buttonSize = isLargerThenSmallMobile ? "LG" : "S";
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
  const [signOut] = useSignOutMutation();
  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    navigate(routes.signIn);
  };

  const renderAuthButton = () => {
    if (!data?.currentUser) {
      return (
        <Link to={routes.signIn}>
          <Button size={buttonSize} css="mr-2" colour="accent">
            Sign In
            <span className="sr-only">Sign in</span>
          </Button>
        </Link>
      );
    }
    return (
      <Button size={buttonSize} css="mr-2" colour="accent" onClick={signUserOut}>
        Sign Out
        <span className="sr-only">Sign out</span>
      </Button>
    );
  };

  const renderSettingsButton = () => {
    if (!data?.currentUser) return null;
    return (
      <Link to={`${routes.settings}/${restaurantSlug}/restaurant`}>
        <Button size={buttonSize} css="mr-2" colour="accent">
          Settings
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
              size={buttonSize}
              themeFont={themeFont}
              css="mr-2"
              colour="accent"
              onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
            >
              Dietaries
              <span className="sr-only">Filters List</span>
            </Button>
            <Button
              size={buttonSize}
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

export { MainMobileHeader };
