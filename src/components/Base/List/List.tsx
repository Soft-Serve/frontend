import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const List: FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
          <ul className=" divide-y-2 divide-gray-200 rounded-md">{children}</ul>
        </dd>
      </div>
    </div>
  );
};

export { List };
