import React from "react";
import type { FC } from "react";
import Loader from "react-loader-spinner";

const SkeletonRestaurant: FC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Loader type="Grid" color="#f87171" height={150} width={150} />
    </div>
  );
};

export { SkeletonRestaurant };
