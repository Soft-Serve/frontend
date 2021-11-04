import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCategories: FC = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Skeleton className="mx-2" width={80} height={40} />
        </div>
      ))}
    </>
  );
};

export { SkeletonCategories };
