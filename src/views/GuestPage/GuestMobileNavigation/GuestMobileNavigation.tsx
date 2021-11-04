import React from "react";
import type { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, MobileBottomNavigation } from "@base";
import {
  DocumentDuplicateIcon,
  AdjustmentsIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { routes } from "src/routes";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useGlobalContext } from "src/contexts";

interface Props {
  setIsMenuSlideOverOpen: any;
}

const GuestMobileNavigation: FC<Props> = ({ setIsMenuSlideOverOpen }) => {
  const { restaurantSlug } = useGlobalContext();
  const { data } = useCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const history = useHistory();

  const logUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
  };

  const renderSettingsButton = () => {
    if (!data?.currentUser) return null;
    return (
      <Button size="S" css="mx-2" colour="accent">
        <Link to={`${routes.settings}/${restaurantSlug}`}>
          <div className="flex flex-col items-center">
            <AdjustmentsIcon className="h-5 w-5" />
            <span>Settings</span>
          </div>
        </Link>
      </Button>
    );
  };

  const renderAuthButton = () => {
    if (data?.currentUser) {
      return (
        <Button size="S" css="mx-2" onClick={logUserOut} colour="accent">
          <div className="flex flex-col items-center">
            <LogoutIcon className="h-5 w-5" />
            <span>Sign out</span>
          </div>
        </Button>
      );
    }
    return (
      <Button size="S" css="mx-2" colour="accent">
        <Link to={routes.signIn}>
          <div className="flex flex-col items-center">
            <LoginIcon className="h-5 w-5" />
            <span>Sign in</span>
          </div>
        </Link>
      </Button>
    );
  };

  return (
    <>
      <MobileBottomNavigation>
        <Button size="S" css="mx-2" colour="accent" onClick={() => setIsMenuSlideOverOpen(true)}>
          <div className="flex flex-col items-center">
            <DocumentDuplicateIcon className="h-5 w-5" />
            <span>Menus</span>
          </div>
        </Button>
        {renderSettingsButton()}
        {renderAuthButton()}
      </MobileBottomNavigation>
    </>
  );
};

export { GuestMobileNavigation };
