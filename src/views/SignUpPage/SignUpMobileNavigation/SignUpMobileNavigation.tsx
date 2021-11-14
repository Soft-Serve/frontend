import React from "react";
import type { FC } from "react";
import { routes } from "@routes";
import {
  MobileNavigation,
  MobileNavigationProfile,
  MobileNavigationWrapper,
  NavigationItem,
} from "@presentational";
import { useGlobalContext } from "@contexts";
import { BookOpenIcon, LoginIcon } from "@heroicons/react/solid";
import { useCurrentUserQuery } from "@shared";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SignUpMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { restaurantSlug } = useGlobalContext();
  const { data } = useCurrentUserQuery();

  const renderSignInButton = () => {
    if (data?.currentUser) return null;
    return (
      <NavigationItem to={routes.signIn}>
        <LoginIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
        <span className="flex-1">Sign in</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>
        {renderSignInButton()}
        <NavigationItem to={`${routes.restaurants}/${restaurantSlug}`}>
          <BookOpenIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
          <span className="flex-1 text-left ">Menu</span>
        </NavigationItem>
      </MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { SignUpMobileNavigation };
