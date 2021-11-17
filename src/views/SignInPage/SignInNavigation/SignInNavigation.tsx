import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { PlusCircleIcon } from "@heroicons/react/solid";

const SignInNavigation: FC = () => {
  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={routes.signUp}>
        <span>Sign Up</span>
        <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Sign Up</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignInNavigation };
