import React, { FC } from "react";
import type { TArg } from "tailwindcss-classnames";
import { baseStyles } from "./styles";

interface Props {
  children: React.ReactNode;
  css?: TArg;
}

const Container: FC<Props> = ({ children, css }) => {
  return <div className={baseStyles(css)}>{children}</div>;
};

export { Container };
