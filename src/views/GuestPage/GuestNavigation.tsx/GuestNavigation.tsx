import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { LoginSVG, LogoutSVG } from "@svgs";
import { useHistory } from "react-router-dom";
import { routes } from "src/routes";
import { useCurrentUserQuery } from "@shared";
import { useSignOutMutation } from "src/shared/SignOut.mutation";
import { AdjustmentsIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "src/contexts";

const GuestNavigation: FC = () => {
  const history = useHistory();
  const { restaurantSlug } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
  const [signOut] = useSignOutMutation();

  const logUserOut = () => {
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
    window.location.reload();
  };

  const renderAuthNavigationItem = () => {
    return data?.currentUser ? (
      <NavigationItem onClick={logUserOut}>
        <span>Sign Out</span>
        <LogoutSVG className="h-5 w-5 text-white" aria-hidden="true" />
      </NavigationItem>
    ) : (
      <NavigationItem to={routes.signIn}>
        <span>Sign In</span>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
      </NavigationItem>
    );
  };

  return (
    <Navigation>
      {data?.currentUser ? (
        <NavigationItem css="border-t-2" to={`${routes.settings}/${restaurantSlug}`}>
          <span>Settings</span>
          <AdjustmentsIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className="sr-only">Settings</span>
        </NavigationItem>
      ) : (
        <NavigationItem css="border-t-2" to={routes.signUp}>
          <span>Sign Up</span>
          <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className="sr-only">Sign Up</span>
        </NavigationItem>
      )}
      {renderAuthNavigationItem()}
    </Navigation>
  );
};

export { GuestNavigation };
