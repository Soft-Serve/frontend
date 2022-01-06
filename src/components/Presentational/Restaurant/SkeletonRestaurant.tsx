import React from "react";
import type { FC } from "react";
import Loader from "react-loader-spinner";

const SkeletonRestaurant: FC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center ">
      <Loader type="MutatingDots" height={130} width={130} />
    </div>
  );
};

export { SkeletonRestaurant };
