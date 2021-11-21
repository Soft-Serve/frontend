import React from "react";
import type { FC } from "react";

const TabWrapper: FC = ({ children }) => {
  return <div className="flex-1 mb-4 h-full w-full">{children}</div>;
};

export { TabWrapper };
