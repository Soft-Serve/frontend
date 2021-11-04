import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { MenuSVG, LoginSVG } from "@svgs";
import { useGlobalContext } from "@contexts";

const SignUpNavigation: FC = () => {
  const { restaurantSlug } = useGlobalContext();

  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={`${routes.restaurants}/${restaurantSlug}`}>
        <span>Menu</span>
        <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </NavigationItem>
      <NavigationItem to={routes.signIn}>
        <span>Sign In</span>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Sign In</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignUpNavigation };
