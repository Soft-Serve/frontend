import React from "react";
import type { FC } from "react";
import { TArg } from "tailwindcss-classnames";
import { container, wrapper } from "./styles";

interface Props {
  css?: TArg;
  withPadding?: boolean;
}

const BoxSection: FC<Props> = ({ children, css, withPadding = true }) => {
  return (
    <div className={container}>
      <div className={wrapper(css, withPadding)}>{children}</div>
    </div>
  );
};

export { BoxSection };
