import React from "react";
import type { FC } from "react";
import { routes } from "@routes";
import { MobileNavigation, MobileNavigationProfile, NavigationItem } from "@presentational";
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
        <LoginIcon
          className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="flex-1">Sign in</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <div className="flex-1 flex flex-col  border-r bg-white h-full broder border-red-50">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1" aria-label="Sidebar">
            {renderSignInButton()}
            <NavigationItem to={`${routes.restaurants}/${restaurantSlug}`}>
              <BookOpenIcon
                className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="flex-1 text-left ">Menu</span>
            </NavigationItem>
          </nav>
        </div>
        <MobileNavigationProfile />
      </div>
    </MobileNavigation>
  );
};

export { SignUpMobileNavigation };
