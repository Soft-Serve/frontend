import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { MobileNavigation, MobileNavigationWrapper, NavigationItem } from "@presentational";
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
        <PlusCircleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
        <span className="flex-1">Sign up</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>
        <NavigationItem to={`${routes.restaurants}/${restaurantSlug}`}>
          <BookOpenIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
          <span className="flex-1 text-left ">Menu</span>
        </NavigationItem>
        {renderSignUpButton()}
      </MobileNavigationWrapper>
    </MobileNavigation>
  );
};

export { SignInMobileNavigation };
