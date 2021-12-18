import React from "react";
import type { FC } from "react";
import { Card, CardContent } from "@base";
import { classnames } from "tailwindcss-classnames";

const SkeletonBannerSettings: FC = () => {
  return (
    <Card>
      <CardContent css={classnames("w-full", "justify-center")}>loading</CardContent>
    </Card>
  );
};

export { SkeletonBannerSettings };
