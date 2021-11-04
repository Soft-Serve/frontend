import React, { HTMLProps } from "react";
import type { FC } from "react";
import { TArg } from "tailwindcss-classnames";
import { buildStyles } from "./styles";

interface Props extends HTMLProps<HTMLDivElement> {
  flexDirection?: "row" | "column";
  css?: TArg;
}

const Columns: FC<Props> = ({ children, flexDirection = "row", css, ...rest }) => {
  return (
    <div className={buildStyles(flexDirection, css)} {...rest}>
      {children}
    </div>
  );
};

export { Columns };
