import React, { FC, HTMLProps } from "react";
import type { TArg } from "tailwindcss-classnames";
import { buildStyles } from "./styles";

interface Props extends HTMLProps<HTMLDivElement> {
  css?: TArg;
}

const CardContent: FC<Props> = ({ children, css }) => {
  return <div className={buildStyles(css)}>{children}</div>;
};

export { CardContent };
