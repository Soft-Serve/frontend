import React from "react";
import type { FC } from "react";
import { MenuSVG, LogoutSVG } from "@svgs";
import { useHistory } from "react-router-dom";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { useGlobalContext } from "@contexts";
import { useSignOutMutation } from "@shared";

const SettingsNavigation: FC = () => {
  const { restaurantSlug } = useGlobalContext();
  const history = useHistory();
  const [signOut] = useSignOutMutation();

  const logUserOut = () => {
    signOut({ variables: { input: {} } });
    window.location.reload();
    history.push(routes.signIn);
  };

  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={`${routes.restaurants}/${restaurantSlug}`}>
        <span>Menu</span>
        <MenuSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </NavigationItem>
      <NavigationItem onClick={logUserOut}>
        <span>Sign Out</span>
        <LogoutSVG className="h-5 w-5 text-white" aria-hidden="true" />
      </NavigationItem>
    </Navigation>
  );
};

export { SettingsNavigation };
