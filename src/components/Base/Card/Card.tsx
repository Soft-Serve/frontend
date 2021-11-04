import React, { FC, HTMLProps } from "react";
import type { TArg } from "tailwindcss-classnames";
import { buildStyles } from "./styles";

interface Props extends HTMLProps<HTMLDivElement> {
  withPadding?: boolean;
  css?: TArg;
  isOverflowHidden?: boolean;
}

const Card: FC<Props> = ({ children, withPadding = true, css, isOverflowHidden = true }) => {
  return <div className={buildStyles(withPadding, css, isOverflowHidden)}>{children}</div>;
};

export { Card };
