import React from "react";
import type { FC } from "react";
import { useCurrentUserQuery } from "src/shared";

const MobileNavigationProfile: FC = () => {
  const { data } = useCurrentUserQuery();
  if (!data?.currentUser) return null;

  const renderName = () => {
    if (data?.currentUser?.first_name.length && data?.currentUser.last_name.length) {
      const { first_name, last_name } = data?.currentUser;
      return (
        <p className="text-sm font-medium text-white">
          {first_name} {last_name}
        </p>
      );
    }
    return null;
  };

  const renderAvatar = () => {
    if (data?.currentUser?.first_name.length && data?.currentUser.last_name.length) {
      const firstNameFirstLetter = data?.currentUser?.first_name.charAt(0).toUpperCase();
      const lastNameFirstLetter = data?.currentUser?.last_name.charAt(0).toUpperCase();
      return (
        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
          <span className="font-medium leading-none text-white">
            {firstNameFirstLetter}
            {lastNameFirstLetter}
          </span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex-shrink-0 flex p-4 bg-gray-800 absolute w-full bottom-0 rounded-t-md ">
      <a href="/" className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          {renderAvatar()}
          <div className="ml-3">{renderName()}</div>
        </div>
      </a>
    </div>
  );
};

export { MobileNavigationProfile };
