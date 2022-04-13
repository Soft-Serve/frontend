import React from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { AdjustmentsIcon, FilterIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Navigation, NavigationItem } from "@presentational";
import { LoginSVG, LogoutSVG, MenuSVG } from "@svgs";
import { clientToken } from "@constants";
import { routes } from "@routes";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useLocation } from "react-router-dom";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}

const MainNavigation: FC<Props> = ({
  setIsFilterSideMenuOpen,
  restaurantSlug,
  themeFont,
  themeTint,
  themeColour,
}) => {
  const { pathname } = useLocation();
  const isOnSettingsPage = pathname.includes("settings");
  const isOnSignInPage = pathname.includes("sign-in");

  const { data } = useCurrentUserQuery();
  const hasUser = !!localStorage.getItem(clientToken);

  const [signOut] = useSignOutMutation();

  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    window.location.assign(`${routes.restaurants}/${restaurantSlug}`);
  };

  const renderSiginButton = () => {
    if (isOnSignInPage) {
      return (
        <NavigationItem
          themeColour={themeColour}
          themeTint={themeTint}
          to={`${routes.restaurants}/${restaurantSlug}`}
        >
          <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Restaurant</span>
          <span className="sr-only">Menu</span>
        </NavigationItem>
      );
    }
    return (
      <NavigationItem themeColour={themeColour} themeTint={themeTint} to={`/sign-in`}>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign In</span>
      </NavigationItem>
    );
  };

  const renderAuthNavigationItem = () => {
    if (data?.currentUser || hasUser) {
      return (
        <NavigationItem themeColour={themeColour} themeTint={themeTint} onClick={signUserOut}>
          <LogoutSVG className="h-5 w-5 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Sign Out</span>
        </NavigationItem>
      );
    }
    return renderSiginButton();
  };

  const renderDietariesNavigationItem = () => {
    if (isOnSettingsPage)
      return (
        <NavigationItem
          themeColour={themeColour}
          themeTint={themeTint}
          css="border-t-2"
          to={`${routes.restaurants}/${restaurantSlug}`}
        >
          <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Menu</span>
          <span className="sr-only">Menu</span>
        </NavigationItem>
      );
    return (
      <NavigationItem
        themeColour={themeColour}
        themeTint={themeTint}
        css="border-t-2"
        onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
      >
        <FilterIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Dietaries</span>
        <span className="sr-only">Settings</span>
      </NavigationItem>
    );
  };

  const renderSignUpButton = () => {
    if (data?.currentUser || hasUser) return null;
    return (
      <NavigationItem themeColour={themeColour} themeTint={themeTint} to="/sign-up">
        <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign Up</span>
        <span className="sr-only">Sign Up</span>
      </NavigationItem>
    );
  };

  const renderSettingsButton = () => {
    if ((!isOnSettingsPage && data?.currentUser) || hasUser) {
      return (
        <NavigationItem
          themeColour={themeColour}
          themeTint={themeTint}
          to={`${routes.restaurants}/${restaurantSlug}/settings/restaurant`}
        >
          <AdjustmentsIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Settings</span>
          <span className="sr-only">Settings</span>
        </NavigationItem>
      );
    }
    return null;
  };

  return (
    <Navigation restaurantSlug={restaurantSlug} themeColour={themeColour} themeTint={themeTint}>
      {renderDietariesNavigationItem()}
      {renderAuthNavigationItem()}
      {renderSettingsButton()}
      {renderSignUpButton()}
    </Navigation>
  );
};

export { MainNavigation };
