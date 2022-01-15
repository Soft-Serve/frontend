import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { Button } from "@base";
import { RestaurantLogo } from "@presentational";
import { routes } from "@routes";
import { useViewport } from "@hooks";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}

const MainMobileHeader: FC<Props> = ({
  children,
  setIsFilterSideMenuOpen,
  setIsMenuSlideOverOpen,
  restaurantSlug,
  themeTint,
  themeColour,
  themeFont,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useViewport();
  const isLargerThenSmallMobile = width > 410;
  const buttonSize = isLargerThenSmallMobile ? "LG" : "S";
  const { data } = useCurrentUserQuery();
  const isOnSignInPage = pathname.includes("sign-in");
  const isOnSignUpPage = pathname.includes("sign-up");
  const isOnSettingsPage = pathname.includes("settings");

  const renderDietaryButton = () => {
    if (!isOnSignInPage && !isOnSignUpPage && !isOnSettingsPage) {
      return (
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
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
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          themeFont={themeFont}
          size={buttonSize}
          css="mr-2"
          colour="accent"
        >
          Settings
        </Button>
      </Link>
    );
  };
  const renderSettingsNav = () => {
    if (!isOnSettingsPage) {
      return renderSettingsButton();
    }
    return null;
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
        <Link to="/sign-up">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            themeFont={themeFont}
            size={buttonSize}
            css="mr-2"
            colour="accent"
          >
            Sign Up
            <span className="sr-only">Sign up</span>
          </Button>
        </Link>
      );
    }
    return (
      <Link to={`${routes.restaurants}/${restaurantSlug}/sign-in`}>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          themeFont={themeFont}
          size={buttonSize}
          css="mr-2"
          colour="accent"
        >
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
          themeColour={themeColour}
          themeTint={themeTint}
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
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            themeFont={themeFont}
            size={buttonSize}
            css="mr-2"
            colour="accent"
          >
            Restaurant
          </Button>
        </Link>
      );
    }
    return (
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
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
            <RestaurantLogo restaurantSlug={restaurantSlug} dimensions={50} />
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
