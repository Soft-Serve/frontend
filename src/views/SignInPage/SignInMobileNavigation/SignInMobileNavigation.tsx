import React from "react";
import type { FC } from "react";
import { routes } from "src/routes";
import { Link } from "react-router-dom";
import { MobileNavigation } from "@presentational";
import { useCurrentUserQuery } from "@shared";
import { useGlobalContext } from "src/contexts";
import { AdjustmentsIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { MenuSVG } from "@svgs";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const SignInMobileNavigation: FC<Props> = ({ isOpen, onClose }) => {
  const { data } = useCurrentUserQuery();
  const { restaurantSlug } = useGlobalContext();

  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      {data?.currentUser && (
        <div className="px-2 space-y-1">
          <Link
            to={`${routes.settings}/${restaurantSlug}`}
            className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <AdjustmentsIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
            <span className="ml-4 text-lg">Settings</span>
          </Link>
        </div>
      )}
      <div className="px-2 space-y-1">
        <Link
          to={routes.signUp}
          className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
        >
          <PlusCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
          <span className="ml-4 text-lg">Sign Up</span>
        </Link>
      </div>
      <div className="px-2 space-y-1">
        <Link
          to={`${routes.restaurants}/${restaurantSlug}`}
          className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
        >
          <MenuSVG className="h-6 w-6 text-red-400" aria-hidden="true" />
          <span className="ml-4 text-lg">Menu</span>
        </Link>
      </div>
    </MobileNavigation>
  );
};

export { SignInMobileNavigation };
