import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import {
  MobileNavigation,
  MobileNavigationProfile,
  MobileNavigationWrapper,
  NavigationItem,
} from "@presentational";
import { CURRENT_USER_QUERY, useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useRestaurantContext } from "src/contexts";
import { BookOpenIcon, LogoutIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import { useNavigate } from "react-router";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SettingsMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { restaurantSlug } = useRestaurantContext();
  const navigate = useNavigate();
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
    navigate(routes.signIn);
  };

  const renderSignOutButton = () => {
    if (!data?.currentUser) return null;
    return (
      <NavigationItem onClick={signUserOut}>
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
