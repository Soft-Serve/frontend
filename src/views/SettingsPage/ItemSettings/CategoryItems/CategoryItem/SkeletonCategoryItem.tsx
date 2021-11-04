import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardContent } from "@base";

const SkeletonCategoryItem: FC = () => {
  return (
    <Card withPadding={false}>
      <Skeleton className="m-2" width={150} height={140} />
      <CardContent>
        <div className="flex flex-col h-full justify-between w-full p-4">
          <div>
            <div className="flex items-center justify-between">
              <Skeleton width={100} height={10} />
              <div className="mt-2 mx-2 ">
                <Skeleton className="m-2" count={2} width={30} height={30} />
              </div>
            </div>
            <Skeleton width={150} height={10} />
          </div>
          <div className="flex items-center flex-wrap w-full">
            <Skeleton width={40} height={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SkeletonCategoryItem };
