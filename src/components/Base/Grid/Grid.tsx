import React, { FC } from "react";
import { buildStyles, SIZE_TYPES } from "./styles";

interface Props {
  size: SIZE_TYPES;
  mobileColumns?: number;
}
const Grid: FC<Props> = ({ children, size, mobileColumns }) => {
  return <div className={buildStyles(size, mobileColumns)}>{children}</div>;
};

export { Grid };
