import React, { FC } from "react";
import { buildStyles, SizeTypes } from "./styles";

interface Props {
  isSmallGap?: boolean;
  size: SizeTypes;
  mobileColumns?: number;
  children: React.ReactNode;
}
const Grid: FC<Props> = ({ children, size, mobileColumns, isSmallGap }) => {
  return <div className={buildStyles(size, mobileColumns, isSmallGap)}>{children}</div>;
};

export { Grid };
