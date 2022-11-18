import classNames from "classnames";
import { FC, HTMLProps, ReactNode } from "react";
import * as styles from "./Box.styles";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  isOverflowVisible?: boolean;
  isPaddingless?: boolean;
  isMarginless?: boolean;
  isFullscreen?: boolean;
  isReducedPadding?: boolean;
  isFullHeight?: boolean;
}

const Box: FC<Props> = ({
  children,
  isFullHeight,
  isOverflowVisible,
  isPaddingless,
  isMarginless,
  isFullscreen,
  isReducedPadding,
  ...rest
}) => {
  const css = classNames(
    styles.root,
    isPaddingless ? styles.noPadding : styles.padding,
    isReducedPadding && styles.reducedPadding,
    isMarginless && styles.noMargin,
    isOverflowVisible && styles.overflowVisible,
    isFullscreen && styles.fullscreen,
    isFullHeight && styles.fullHeight,
    rest.className
  );
  return (
    <section {...rest} className={css}>
      {children}
    </section>
  );
};

Box.defaultProps = {
  isMarginless: false,
  isOverflowVisible: false,
  isPaddingless: false,
  isFullscreen: false,
  isReducedPadding: false,
  isFullHeight: false,
};

export { Box };
