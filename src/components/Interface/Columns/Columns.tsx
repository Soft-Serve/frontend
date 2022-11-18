import classNames from "classnames";
import type { FC, HTMLProps, ReactNode } from "react";
import * as styles from "./Columns.styles";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  isStackingOnMobile?: boolean;
  isWrapping?: boolean;
  isMarginless?: boolean;
  isMarginPreserved?: boolean;
  isWrappingReverse?: boolean;
}

const Columns: FC<Props> = ({
  children,
  isMarginless,
  isWrapping,
  isWrappingReverse,
  isStackingOnMobile,
  isMarginPreserved,
  ...rest
}) => {
  const columnsStyles = classNames(
    styles.root,
    styles.rows,
    isWrappingReverse && styles.reverseWrap,
    isStackingOnMobile && styles.rowOnMobile,
    isMarginless && styles.isMarginless,
    isWrapping && styles.wrap,
    rest.className
  );

  return (
    <div {...rest} className={columnsStyles}>
      {children}
    </div>
  );
};

Columns.defaultProps = {
  isMarginPreserved: false,

  isStackingOnMobile: true,
  isMarginless: false,
  isWrapping: false,
  isWrappingReverse: false,
};

export { Columns };
