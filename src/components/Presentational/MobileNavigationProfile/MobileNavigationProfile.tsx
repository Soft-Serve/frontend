import React from "react";
import type { FC } from "react";
import { useCurrentUserQuery } from "@shared";

const MobileNavigationProfile: FC = () => {
  const { data } = useCurrentUserQuery();

  if (!data?.currentUser) {
    return null;
  }

  const renderName = () => {
    if (data?.currentUser?.first_name.length && data?.currentUser.last_name.length) {
      const { first_name: firstName, last_name: lastName } = data?.currentUser;
      return (
        <p className="text-sm font-medium text-white">
          {firstName} {lastName}
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
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
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
    <div className="absolute bottom-0 flex w-full flex-shrink-0 rounded-t-md bg-gray-800 p-4 ">
      <a href="/" className="group block w-full flex-shrink-0">
        <div className="flex items-center">
          {renderAvatar()}
          <div className="ml-3">{renderName()}</div>
        </div>
      </a>
    </div>
  );
};

export { MobileNavigationProfile };
