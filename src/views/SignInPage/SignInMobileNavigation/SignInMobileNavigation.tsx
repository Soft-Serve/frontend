import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { MobileNavigation, MobileNavigationWrapper, NavigationItem } from "@presentational";
import { PlusCircleIcon } from "@heroicons/react/solid";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SignInMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const renderSignUpButton = () => {
    return (
      <NavigationItem css="border-t-2" to={routes.signUp}>
        <PlusCircleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
        <span className="flex-1">Sign up</span>
      </NavigationItem>
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>{renderSignUpButton()}</MobileNavigationWrapper>
    </MobileNavigation>
  );
};

export { SignInMobileNavigation };
