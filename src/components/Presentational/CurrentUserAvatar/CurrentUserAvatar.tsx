import React from "react";
import type { FC } from "react";
import { useCurrentUserQuery } from "@shared";
import { routes } from "src/routes";
import { Link } from "react-router-dom";

interface Props {
  restaurantSlug: string;
}

const CurrentUserAvatar: FC<Props> = ({ restaurantSlug }) => {
  const { data } = useCurrentUserQuery();

  return (
    <div className="border-blue-gray-200 flex flex-shrink-0 border-t p-4">
      <Link to={`${routes.settings}/${restaurantSlug}`} className="group block flex-shrink-0">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-blue-gray-700 group-hover:text-blue-gray-900 text-base font-medium">
              {data?.currentUser?.first_name} <span>{data?.currentUser?.last_name}</span>
            </p>
            <p className="text-blue-gray-500 group-hover:text-blue-gray-700 text-sm font-medium">
              Account Settings
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { CurrentUserAvatar };
