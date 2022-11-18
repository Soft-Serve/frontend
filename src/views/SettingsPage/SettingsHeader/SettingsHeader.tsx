import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const SettingsHeader: FC<Props> = ({ children }) => {
  return <h2 className="font-Quicksand text-3xl font-extrabold text-gray-900">{children}</h2>;
};

export { SettingsHeader };
