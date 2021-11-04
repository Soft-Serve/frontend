import React, { HTMLProps } from "react";
import type { FC } from "react";
import { TArg } from "tailwindcss-classnames";
import { buildStyles } from "./styles";

interface Props extends HTMLProps<HTMLDivElement> {
  textDirection?: "left" | "center";
  flexBehavior?: "default" | "initial" | "auto" | "none";
  css?: TArg;
  isFullwidth?: boolean;
  isMarginLess?: boolean;
}
const Column: FC<Props> = ({
  children,
  textDirection = "left",
  flexBehavior = "default",
  isFullwidth,
  css,
  isMarginLess,
  ...rest
}) => {
  return (
    <div className={buildStyles(textDirection, flexBehavior, css, isFullwidth)} {...rest}>
      {children}
    </div>
  );
};

export { Column };
