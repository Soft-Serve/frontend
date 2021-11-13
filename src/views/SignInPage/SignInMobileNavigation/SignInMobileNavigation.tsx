import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { MobileNavigation, NavigationItem } from "@presentational";
import { useCurrentUserQuery } from "@shared";
import { useGlobalContext } from "src/contexts";
import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/solid";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SignInMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { data } = useCurrentUserQuery();
  const { restaurantSlug } = useGlobalContext();

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
            {renderSignUpButton()}
          </nav>
        </div>
      </div>
    </MobileNavigation>
  );
};

export { SignInMobileNavigation };
