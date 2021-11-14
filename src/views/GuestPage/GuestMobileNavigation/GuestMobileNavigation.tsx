import React from "react";
import type { FC } from "react";
import {
  MobileNavigation,
  MobileNavigationWrapper,
  MobileNavigationProfile,
  NavigationItem,
} from "@presentational";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { LoginIcon } from "@heroicons/react/outline";
import { routes } from "src/routes";
import { AdjustmentsIcon, LogoutIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { useGlobalContext } from "@contexts";
import { classnames } from "tailwindcss-classnames";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const GuestMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { data } = useCurrentUserQuery();
  const { restaurantSlug } = useGlobalContext();

  const [signOut] = useSignOutMutation();
  const history = useHistory();

  const logUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
    window.location.reload();
  };

  const renderSignUpButton = () => {
    if (data?.currentUser) return null;
    return (
      <NavigationItem to={routes.signUp}>
        <PlusCircleIcon
          className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="flex-1">Sign up</span>
      </NavigationItem>
    );
  };

  const renderSignInButton = () => {
    if (data?.currentUser) return null;
    return (
      <NavigationItem css={classnames("border-t-2")} to={routes.signIn}>
        <LoginIcon
          className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="flex-1">Sign in</span>
      </NavigationItem>
    );
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

  const renderSettingsButton = () => {
    if (!data?.currentUser) return null;
    return (
      <NavigationItem css={classnames("border-t-2")} to={`${routes.settings}/${restaurantSlug}`}>
        <AdjustmentsIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
        <span className="flex-1 text-left ">Settings</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>
        {renderSignInButton()}
        {renderSettingsButton()}
        {renderSignOutButton()}
        {renderSignUpButton()}
      </MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { GuestMobileNavigation };
