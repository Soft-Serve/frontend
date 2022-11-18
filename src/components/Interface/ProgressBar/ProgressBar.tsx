import type { FC, HTMLProps } from "react";
import classNames from "classnames";
import * as styles from "./ProgressBar.styles";

interface Props extends HTMLProps<HTMLDivElement> {
  completion: number;
}

const ProgressBar: FC<Props> = ({ completion, ...rest }) => {
  return (
    <div role="progress-bar" {...rest} className={classNames(styles.root, rest.className)}>
      <div
        className={classNames(styles.bar)}
        style={{
          width: `${completion}%`,
        }}
      >
        <span className="sr-only">completed: {completion}%</span>
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  completion: 0,
};

export { ProgressBar };
