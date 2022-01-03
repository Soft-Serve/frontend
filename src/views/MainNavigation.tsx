import React from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { AdjustmentsIcon, FilterIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Navigation, NavigationItem } from "@presentational";
import { LoginSVG, LogoutSVG, MenuSVG } from "@svgs";
import { routes } from "@routes";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useRestaurantContext } from "@contexts";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MainNavigation: FC<Props> = ({ setIsFilterSideMenuOpen }) => {
  const { pathname } = useLocation();
  const isOnSettingsPage = pathname.includes("settings");
  const isOnSignInPage = pathname.includes("sign-in");

  const navigate = useNavigate();
  const { restaurantSlug, themeFont } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
  const [signOut] = useSignOutMutation();

  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    navigate(`${routes.restaurants}/${restaurantSlug}/sign-in`);
    window.location.reload();
  };

  const renderSiginButton = () => {
    if (isOnSignInPage) {
      return (
        <NavigationItem to={`${routes.restaurants}/${restaurantSlug}`}>
          <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Restaurant</span>
          <span className="sr-only">Menu</span>
        </NavigationItem>
      );
    }
    return (
      <NavigationItem to={`${routes.restaurants}/${restaurantSlug}/sign-in`}>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign In</span>
      </NavigationItem>
    );
  };

  const renderAuthNavigationItem = () => {
    if (data?.currentUser) {
      return (
        <NavigationItem onClick={signUserOut}>
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
        <NavigationItem css="border-t-2" to={`${routes.restaurants}/${restaurantSlug}`}>
          <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Menu</span>
          <span className="sr-only">Menu</span>
        </NavigationItem>
      );
    return (
      <NavigationItem
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
    if (data?.currentUser) return null;
    return (
      <NavigationItem to={`${routes.restaurants}/${restaurantSlug}/sign-up`}>
        <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign Up</span>
        <span className="sr-only">Sign Up</span>
      </NavigationItem>
    );
  };

  const renderSettingsButton = () => {
    if (!isOnSettingsPage && data?.currentUser) {
      return (
        <NavigationItem to={`${routes.restaurants}/${restaurantSlug}/settings/restaurant`}>
          <AdjustmentsIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Settings</span>
          <span className="sr-only">Settings</span>
        </NavigationItem>
      );
    }
    return null;
  };

  return (
    <Navigation>
      {renderDietariesNavigationItem()}
      {renderAuthNavigationItem()}
      {renderSettingsButton()}
      {renderSignUpButton()}
    </Navigation>
  );
};

export { MainNavigation };
