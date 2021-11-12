import React from "react";
import type { FC } from "react";
import { useGlobalContext } from "src/contexts";
import { useCurrentUserQuery, useRestaurantQuery, useSignOutMutation } from "@shared";
import { RestaurantLogo } from "@presentational";
import { LoginIcon, LogoutIcon, MenuIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import { routes } from "src/routes";
import { Button } from "@base";

interface Props {
  setIsMenuSlideOverOpen: any;
}

const GuestMobileHeader: FC<Props> = ({ children, setIsMenuSlideOverOpen }) => {
  const history = useHistory();
  const { data: currentUserData } = useCurrentUserQuery();
  const { restaurantSlug, themeColour, themeTint } = useGlobalContext();
  const [signOut] = useSignOutMutation();
  const { data } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });

  const logUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
  };

  const restaurantName = data?.restaurant.name;

  const renderAuthButton = () => {
    if (currentUserData?.currentUser) {
      return (
        <Button size="LG" css="mx-2" onClick={logUserOut} colour="accent">
          <div className="flex flex-col items-center">
            <LogoutIcon className="h-5 w-5" />
          </div>
        </Button>
      );
    }
    return (
      <Button size="LG" css="mx-2" colour="accent">
        <Link to={routes.signIn}>
          <div className="flex  items-center">
            <span className="mx-2">Sign in</span>
            <LoginIcon className="h-5 w-5" />
          </div>
        </Link>
      </Button>
    );
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} py-2 px-4 flex items-center justify-between sm:px-6`}
        >
          <div className="flex items-center">
            <RestaurantLogo dimensions={50} />
            {restaurantName && (
              <div className="ml-4">
                <h2 className="text-2xl text-white font-semibold">{restaurantName}</h2>
              </div>
            )}
          </div>
          {!currentUserData?.currentUser && renderAuthButton()}
        </div>
      </div>
      {children}
    </div>
  );
};

export { GuestMobileHeader };
