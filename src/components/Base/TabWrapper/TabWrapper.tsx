import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const TabWrapper: FC<Props> = ({ children }) => {
  return <div className="mb-4 h-full w-full flex-1">{children}</div>;
};

export { TabWrapper };
