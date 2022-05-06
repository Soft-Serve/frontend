import React, { FC } from "react";
import { buildStyles, SizeTypes } from "./styles";

interface Props {
  size: SizeTypes;
  mobileColumns?: number;
  children: React.ReactNode;
}
const Grid: FC<Props> = ({ children, size, mobileColumns }) => {
  return <div className={buildStyles(size, mobileColumns)}>{children}</div>;
};

export { Grid };
