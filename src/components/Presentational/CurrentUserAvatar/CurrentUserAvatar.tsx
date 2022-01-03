import React from "react";
import type { FC } from "react";
import { useCurrentUserQuery } from "@shared";
import { routes } from "src/routes";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "src/contexts";

const CurrentUserAvatar: FC = () => {
  const { restaurantSlug } = useRestaurantContext();
  const { data } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });

  return (
    <div className="flex-shrink-0 flex border-t border-blue-gray-200 p-4">
      <Link to={`${routes.settings}/${restaurantSlug}`} className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-blue-gray-700 group-hover:text-blue-gray-900">
              {data?.currentUser?.first_name} <span>{data?.currentUser?.last_name}</span>
            </p>
            <p className="text-sm font-medium text-blue-gray-500 group-hover:text-blue-gray-700">
              Account Settings
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { CurrentUserAvatar };
