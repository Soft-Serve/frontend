import React from "react";
import type { FC } from "react";
import { LoadingSVG } from "@svgs";

const SkeletonRestaurant: FC = () => {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <span
        className=" opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
        style={{
          top: "50%",
        }}
      >
        <LoadingSVG className="text-red-400 w-24 h-24 md:w-14 md:h-14 animate-spin" />
      </span>
    </div>
  );
};

export { SkeletonRestaurant };
