import React from "react";
import type { FC } from "react";

import Skeleton from "react-loading-skeleton";

const MobileSkeletonMenuItem: FC = () => {
  return (
    <div className="flex flex-col rounded-md shadow-md overflow-hidden">
      <div className="flex-shrink-0 h-40 relative">
        <Skeleton className="h-40 w-40" />
      </div>
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
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
