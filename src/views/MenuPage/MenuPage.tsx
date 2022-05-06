import React from "react";
import type { FC } from "react";
import { page } from "./styles";

interface Props {
  children: React.ReactNode;
}

const MenuPage: FC<Props> = ({ children }) => {
  return <section className={page}>{children}</section>;
};

export { MenuPage };
