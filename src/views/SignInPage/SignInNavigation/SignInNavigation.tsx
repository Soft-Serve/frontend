import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { UserAddIcon } from "@heroicons/react/solid";

const SignInNavigation: FC = () => {
  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={routes.signUp}>
        <UserAddIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="mx-2">Sign Up</span>
        <span className="sr-only">Sign Up</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignInNavigation };
