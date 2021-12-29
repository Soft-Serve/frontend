import React from "react";
import type { FC } from "react";
import Loader from "react-loader-spinner";

const SkeletonSettingsPage: FC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Loader type="Grid" color="#000000" height={150} width={150} />
    </div>
  );
};

export { SkeletonSettingsPage };