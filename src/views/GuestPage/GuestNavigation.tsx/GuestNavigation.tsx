import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { LoginSVG, LogoutSVG } from "@svgs";
import { routes } from "src/routes";
import { CURRENT_USER_QUERY, useCurrentUserQuery } from "@shared";
import { useSignOutMutation } from "src/shared/SignOut.mutation";
import { AdjustmentsIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "src/contexts";

const GuestNavigation: FC = () => {
  const { restaurantSlug } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
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

  const renderAuthNavigationItem = () => {
    return data?.currentUser ? (
      <NavigationItem onClick={signUserOut}>
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
