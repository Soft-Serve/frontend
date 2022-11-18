import classNames from "classnames";
import { FC, HTMLProps } from "react";
import * as styles from "./Column.styles";

type Sizes = "one" | "two" | "three" | "four" | "five" | "six" | "small";

interface Props extends HTMLProps<HTMLDivElement> {
  columnWidth?: Sizes;
  isPaddingless?: boolean;
}

const Column: FC<Props> = ({ children, isPaddingless, columnWidth = "three", ...rest }) => {
  const css = classNames(
    styles.root,
    styles[columnWidth],
    isPaddingless && styles.isPaddingless,
    rest.className
  );

  return (
    <div {...rest} className={css}>
      {children}
    </div>
  );
};

Column.defaultProps = {
  columnWidth: "three",
  isPaddingless: false,
};

export { Column };
