import { FC, ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import * as styles from "./Tooltip.styles";
import classnames from "classnames";

type Placement = "left" | "right" | "bottom" | "top";

interface Props {
  themeTint: number;
  themeColour: string;
  children: ReactNode;
  isHidden?: boolean;
  isAutoShowing?: boolean;
  tooltipContent: ReactNode;
  placement?: Placement;
  offset?: any;
}
const Tooltip: FC<Props> = ({
  themeColour,
  themeTint,
  tooltipContent,
  children,
  placement = "top",
  isHidden,
  isAutoShowing,
  offset = [0, 16],
}) => {
  const [isVisible, setIsVisible] = useState(isAutoShowing);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
    ],
  });

  const toggleVisibility = () => (isAutoShowing ? null : setIsVisible(prevState => !prevState));

  const renderTooltip = () => {
    if (isVisible) {
      return (
        <div
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
          className={classnames(styles.root(themeColour, themeTint))}
        >
          {tooltipContent}
          <div
            ref={setArrowElement}
            style={popperStyles.arrow}
            className={classnames(
              styles.tooltip(themeColour, themeTint).base,
              styles.tooltip(themeColour, themeTint)[placement].base
            )}
          >
            <div
              className={classnames(
                styles.tooltip(themeColour, themeTint).arrow,
                styles.tooltip(themeColour, themeTint)[placement].arrow
              )}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        role="tooltip"
        ref={setReferenceElement as any}
        onMouseEnter={toggleVisibility}
        onMouseLeave={toggleVisibility}
      >
        {children}
      </div>
      {renderTooltip()}
    </>
  );
};

Tooltip.defaultProps = {
  isHidden: false,
  isAutoShowing: false,
};

export { Tooltip };
