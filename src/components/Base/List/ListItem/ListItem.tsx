import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const ListItem: FC<Props> = ({ children }) => {
  return <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">{children}</li>;
};

export { ListItem };
