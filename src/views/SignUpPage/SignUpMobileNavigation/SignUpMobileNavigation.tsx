import React from "react";
import type { FC } from "react";
import { routes } from "@routes";
import {
  MobileNavigation,
  MobileNavigationProfile,
  MobileNavigationWrapper,
  NavigationItem,
} from "@presentational";
import { useRestaurantContext } from "@contexts";
import { LoginIcon } from "@heroicons/react/solid";
import { useCurrentUserQuery } from "@shared";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SignUpMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { restaurantSlug } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });

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
      <MobileNavigationWrapper>{renderSignInButton()}</MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { SignUpMobileNavigation };
