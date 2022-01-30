import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardContent } from "@base";

const SkeletonMenuItemWithoutImage: FC = () => {
  return (
    <Card withPadding={false}>
      <CardContent>
        <div className="flex h-full w-full flex-col justify-between p-4">
          <div>
            <div className="flex items-center justify-between">
              <Skeleton width={100} height={10} />
              <div className="mx-2 mt-2 ">
                <Skeleton className="m-2" count={2} width={30} height={30} />
              </div>
            </div>
            <Skeleton width={150} height={10} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SkeletonMenuItemWithoutImage };
