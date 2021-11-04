import React from "react";
import type { FC } from "react";
import { LoginSVG, LogoutSVG, MenuSVG } from "@svgs";
import { routes } from "src/routes";
import { Link, useHistory } from "react-router-dom";
import { MobileNavigation } from "@presentational";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { useGlobalContext } from "src/contexts";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SettingsMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { restaurantSlug } = useGlobalContext();
  const { data } = useCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const history = useHistory();

  const logUserOut = () => {
    signOut({ variables: { input: {} } });
    history.push("/admin");
  };

  const renderSVG = () => {
    return data?.currentUser ? (
      <div onKeyPress={logUserOut} tabIndex={0} role="button" onClick={logUserOut}>
        <LogoutSVG className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
    ) : (
      <LoginSVG className="h-6 w-6 text-red-400" aria-hidden="true" />
    );
  };

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <div className="px-2 space-y-1">
        <Link
          to={`${routes.restaurants}/${restaurantSlug}`}
          className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
        >
          <MenuSVG className="h-6 w-6 text-red-400" aria-hidden="true" />
          <span className="ml-4 text-lg">Menu</span>
        </Link>
      </div>
      <div className="px-2 space-y-1">
        <Link
          to={`${routes.restaurants}/${restaurantSlug}`}
          className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
        >
          {renderSVG()}
          <span className="ml-4 text-lg"> {data?.currentUser ? "Logout" : "Sign In"}</span>
        </Link>
      </div>
    </MobileNavigation>
  );
};

export { SettingsMobileNavigation };
