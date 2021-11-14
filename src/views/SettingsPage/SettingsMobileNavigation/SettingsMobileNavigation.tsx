import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { useHistory } from "react-router-dom";
import {
  MobileNavigation,
  MobileNavigationProfile,
  MobileNavigationWrapper,
  NavigationItem,
} from "@presentational";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useGlobalContext } from "src/contexts";
import { BookOpenIcon, LogoutIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SettingsMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { restaurantSlug } = useGlobalContext();
  const { data } = useCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const history = useHistory();

  const logUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
    window.location.reload();
  };

  const renderSignOutButton = () => {
    if (!data?.currentUser) return null;
    return (
      <NavigationItem onClick={logUserOut}>
        <LogoutIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
        <span className="flex-1 text-left ">Sign out</span>
      </NavigationItem>
    );
  };

  const renderMenuButton = () => {
    return (
      <NavigationItem css={classnames("border-t-2")} to={`${routes.restaurants}/${restaurantSlug}`}>
        <BookOpenIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white " aria-hidden="true" />
        <span className="flex-1 text-left ">Menu</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>
        {renderMenuButton()}
        {renderSignOutButton()}
      </MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { SettingsMobileNavigation };
