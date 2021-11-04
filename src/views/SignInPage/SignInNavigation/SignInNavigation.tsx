import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { MenuSVG } from "@svgs";
import { useGlobalContext } from "@contexts";
import { PlusCircleIcon } from "@heroicons/react/solid";

const SignInNavigation: FC = () => {
  const { restaurantSlug } = useGlobalContext();

  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={`${routes.restaurants}/${restaurantSlug}`}>
        <span>Menu</span>
        <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </NavigationItem>
      <NavigationItem to={routes.signUp}>
        <span>Sign Up</span>
        <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Sign Up</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignInNavigation };
