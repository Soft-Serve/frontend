import React from "react";
import type { FC } from "react";

import Skeleton from "react-loading-skeleton";

const MobileSkeletonMenuItem: FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md shadow-md">
      <div className="relative h-40 flex-shrink-0">
        <Skeleton className="h-40 w-40" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-4">
        <div className="flex w-full justify-between">
          <Skeleton width={20} height={20} />
        </div>
      </div>
      <div className="w-full bg-white p-2 pb-0">
        <Skeleton width={20} height={20} />
      </div>
    </div>
  );
};

export { MobileSkeletonMenuItem };
