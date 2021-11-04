import React from "react";
import type { FC } from "react";
import { page } from "./styles";

const MenuPage: FC = ({ children }) => {
  return <section className={page}>{children}</section>;
};

export { MenuPage };
