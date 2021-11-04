import React from "react";
import type { FC } from "react";

const List: FC = ({ children }) => {
  return (
    <div className="w-full">
      <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
          <ul className=" rounded-md divide-y-2 divide-gray-200">{children}</ul>
        </dd>
      </div>
    </div>
  );
};

export { List };
