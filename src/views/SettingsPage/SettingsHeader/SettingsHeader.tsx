import React from "react";
import type { FC } from "react";

const SettingsHeader: FC = ({ children }) => {
  return <h2 className="text-3xl mr-4 font-extrabold text-gray-900 mb-2">{children}</h2>;
};

export { SettingsHeader };
