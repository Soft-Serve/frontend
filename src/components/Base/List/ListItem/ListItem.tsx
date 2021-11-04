import React from "react";
import type { FC } from "react";

const ListItem: FC = ({ children }) => {
  return <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">{children}</li>;
};

export { ListItem };
