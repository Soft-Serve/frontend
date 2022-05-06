import React, { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { buildStyles, SizeTypes, ColourTypes } from "./styles";

interface Props {
  type?: ColourTypes;
  size?: SizeTypes;
  children: React.ReactNode;
}

const Pill: FC<Props> = ({ children, type, size }) => {
  return <span className={classnames(buildStyles(size, type))}>{children}</span>;
};

Pill.defaultProps = {
  size: "SM",
  type: "success",
};

export { Pill };
