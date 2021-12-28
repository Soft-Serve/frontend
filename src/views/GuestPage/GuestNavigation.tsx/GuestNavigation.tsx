import React from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { AdjustmentsIcon, FilterIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Navigation, NavigationItem } from "@presentational";
import { LoginSVG, LogoutSVG } from "@svgs";
import { routes } from "@routes";
import { CURRENT_USER_QUERY, useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useRestaurantContext } from "@contexts";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
}
const GuestNavigation: FC<Props> = ({ setIsFilterSideMenuOpen }) => {
  const { restaurantSlug, themeFont } = useRestaurantContext();
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
        <LogoutSVG className="h-5 w-5 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign Out</span>
      </NavigationItem>
    ) : (
      <NavigationItem to={routes.signIn}>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Sign In</span>
      </NavigationItem>
    );
  };

  return (
    <Navigation>
      <NavigationItem
        css="border-t-2"
        onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
      >
        <FilterIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <span className={`mx-2 font-${themeFont}`}>Dietaries</span>
        <span className="sr-only">Settings</span>
      </NavigationItem>
      {renderAuthNavigationItem()}
      {data?.currentUser ? (
        <NavigationItem to={`${routes.settings}/${restaurantSlug}/restaurant`}>
          <AdjustmentsIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Settings</span>
          <span className="sr-only">Settings</span>
        </NavigationItem>
      ) : (
        <NavigationItem to={routes.signUp}>
          <PlusCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className={`mx-2 font-${themeFont}`}>Sign Up</span>
          <span className="sr-only">Sign Up</span>
        </NavigationItem>
      )}
    </Navigation>
  );
};

export { GuestNavigation };
