import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardContent, List, ListItem } from "@base";

const SkeletonList: FC = () => {
  return (
    <Card>
      <CardContent>
        <List>
          {[...new Array(4)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index}>
              <Skeleton width={80} height={30} />
              <div>
                <Skeleton className="mx-2" width={80} height={30} />
                <Skeleton width={80} height={30} />
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { SkeletonList };
