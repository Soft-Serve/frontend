import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRestaurantContext } from "src/contexts";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { Button } from "@base";
import { RestaurantLogo } from "@presentational";
import { routes } from "@routes";
import { useViewport } from "src/hooks";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
  setisSubSettingsSlideOverOpen: Dispatch<SetStateAction<boolean>>;
}

const MainMobileHeader: FC<Props> = ({
  children,
  setIsFilterSideMenuOpen,
  setIsMenuSlideOverOpen,
  setisSubSettingsSlideOverOpen,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { themeColour, themeTint, themeFont, restaurantSlug } = useRestaurantContext();
  const { width } = useViewport();
  const isLargerThenSmallMobile = width > 410;
  const buttonSize = isLargerThenSmallMobile ? "LG" : "S";
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
  const isOnSignInPage = pathname.includes("sign-in");
  const isOnSignUpPage = pathname.includes("sign-up");
  const isOnSettingsPage = pathname.includes("settings");

  const renderDietaryButton = () => {
    if (!isOnSignInPage && !isOnSignUpPage && !isOnSettingsPage) {
      return (
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
      );
    }
    return null;
  };

  const renderSettingsButton = () => {
    if (!data?.currentUser) return null;
    return (
      <Link to={`${routes.restaurants}/${restaurantSlug}/settings/restaurant`}>
        <Button themeFont={themeFont} size={buttonSize} css="mr-2" colour="accent">
          Settings
        </Button>
      </Link>
    );
  };
  const renderSettingsNav = () => {
    if (!isOnSettingsPage) {
      return renderSettingsButton();
    }
    return (
      <Button
        size={buttonSize}
        themeFont={themeFont}
        css="mr-2"
        colour="accent"
        onClick={() => setisSubSettingsSlideOverOpen(prevState => !prevState)}
      >
        Settings Menu
        <span className="sr-only">SettingsMenu</span>
      </Button>
    );
  };

  const [signOut] = useSignOutMutation();
  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    navigate(`${routes.restaurants}/${restaurantSlug}/sign-in`);
    window.location.reload();
  };

  const renderSignInButton = () => {
    if (isOnSignInPage) {
      return (
        <Link to={`${routes.restaurants}/${restaurantSlug}/sign-up`}>
          <Button themeFont={themeFont} size={buttonSize} css="mr-2" colour="accent">
            Sign Up
            <span className="sr-only">Sign up</span>
          </Button>
        </Link>
      );
    }
    return (
      <Link to={`${routes.restaurants}/${restaurantSlug}/sign-in`}>
        <Button themeFont={themeFont} size={buttonSize} css="mr-2" colour="accent">
          Sign In
          <span className="sr-only">Sign in</span>
        </Button>
      </Link>
    );
  };

  const renderAuthButton = () => {
    if (data?.currentUser) {
      return (
        <Button
          onClick={() => signUserOut()}
          themeFont={themeFont}
          size={buttonSize}
          css="mr-2"
          colour="accent"
        >
          Sign Out
          <span className="sr-only">Sign in</span>
        </Button>
      );
    }
    return renderSignInButton();
  };

  const renderMenuButton = () => {
    if (isOnSignInPage || isOnSignUpPage || isOnSettingsPage) {
      return (
        <Link to={`${routes.restaurants}/${restaurantSlug}`}>
          <Button themeFont={themeFont} size={buttonSize} css="mr-2" colour="accent">
            Restaurant
          </Button>
        </Link>
      );
    }
    return (
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
            {renderDietaryButton()}
            {renderMenuButton()}
            {renderSettingsNav()}
            {renderAuthButton()}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { MainMobileHeader };
