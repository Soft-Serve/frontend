import React from "react";
import type { FC } from "react";

const SettingsHeader: FC = ({ children }) => {
  return (
    <h2 className="mr-4 mb-2  font-Quicksand text-3xl font-extrabold text-gray-900">{children}</h2>
  );
};

export { SettingsHeader };
