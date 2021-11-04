import React, { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { buildStyles, SIZE_TYPES, COLOUR_TYPES } from "./styles";

interface Props {
  type?: COLOUR_TYPES;
  size?: SIZE_TYPES;
}

const Pill: FC<Props> = ({ children, type, size }) => {
  return <span className={classnames(buildStyles(size, type))}>{children}</span>;
};

Pill.defaultProps = {
  size: "SM",
  type: "success",
};

export { Pill };
