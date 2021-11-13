import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { useHistory } from "react-router-dom";
import { MobileNavigation, MobileNavigationProfile, NavigationItem } from "@presentational";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useGlobalContext } from "src/contexts";
import { BookOpenIcon, LogoutIcon } from "@heroicons/react/solid";

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
        <LogoutIcon
          className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="flex-1 text-left ">Sign out</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <div className="flex-1 flex flex-col  border-r bg-white h-full broder border-red-50">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1" aria-label="Sidebar">
            <NavigationItem to={`${routes.restaurants}/${restaurantSlug}`}>
              <BookOpenIcon
                className="mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="flex-1 text-left ">Menu</span>
            </NavigationItem>
            {renderSignOutButton()}
          </nav>
        </div>
        <MobileNavigationProfile />
      </div>
    </MobileNavigation>
  );
};

export { SettingsMobileNavigation };
