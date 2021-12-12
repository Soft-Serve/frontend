import React from "react";
import type { FC } from "react";
import { MenuSVG, LogoutSVG } from "@svgs";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { useRestaurantContext } from "@contexts";
import { CURRENT_USER_QUERY, useSignOutMutation } from "@shared";

const SettingsNavigation: FC = () => {
  const { restaurantSlug } = useRestaurantContext();
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
    window.location.assign(routes.signIn);
  };
  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={`${routes.restaurants}/${restaurantSlug}`}>
        <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="mx-2">Menu</span>
        <span className="sr-only">Menu</span>
      </NavigationItem>
      <NavigationItem onClick={signUserOut}>
        <LogoutSVG className="h-5 w-5 text-white" aria-hidden="true" />
        <span className="mx-2">Sign Out</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SettingsNavigation };
