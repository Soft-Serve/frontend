import React from "react";
import type { FC } from "react";

const TabWrapper: FC = ({ children }) => {
  return <div className="mb-4 h-full w-full flex-1">{children}</div>;
};

export { TabWrapper };
