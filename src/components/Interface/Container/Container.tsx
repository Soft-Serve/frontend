import { useEffect, useRef, useState, isValidElement, ReactNode, FC, HTMLProps } from "react";
import classNames from "classnames";
import { ProgressBar } from "@interface";
import * as styles from "./Container.styles";
import "./Container.css";

type Width = "extraSmall" | "small" | "medium" | "large" | "full";

interface Props extends HTMLProps<HTMLDivElement> {
  containerWidth: Width;
  adjustHeight?: number;
  staticContent?: ReactNode;
  initialCompletion?: number;
  isTopBarVisible?: boolean;
  isScrollable?: boolean;
  isScrollShadowVisible?: boolean;
}

const Container: FC<Props> = ({
  containerWidth,
  staticContent,
  isScrollable,
  isTopBarVisible,
  adjustHeight = 0,
  initialCompletion = 5,
  isScrollShadowVisible,
  children,
  ...rest
}) => {
  const { className, ...remainder } = rest;
  const containerRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const [completion, setCompletion] = useState(initialCompletion);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [headerHeight, setHeaderHeight] = useState(0);

  const height = screenHeight - headerHeight;

  useEffect(() => {
    if (isScrollable) {
      if (staticRef?.current?.clientHeight) {
        setHeaderHeight(staticRef?.current?.clientHeight);
      }

      const handleWindowResize = () => {
        if (staticRef?.current?.clientHeight) {
          setScreenHeight(window.innerHeight);
          setHeaderHeight(staticRef.current.clientHeight);
        }
      };

      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, [staticRef?.current?.clientHeight]);

  useEffect(() => {
    if (isScrollable) {
      if (containerRef?.current?.scrollTop === 0 && !!initialCompletion)
        setCompletion(initialCompletion);
    }
  }, [containerRef?.current?.scrollTop]);

  if (isScrollable) {
    const onScroll = (e: any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      const remainingScrollHeight = scrollHeight - clientHeight;
      setCompletion(Number((scrollTop / remainingScrollHeight).toFixed(2)) * 100);
    };

    const renderStaticContent = () => {
      if (isValidElement(staticContent)) return <div>{staticContent}</div>;
      return null;
    };

    const getHeight = () => height - adjustHeight;

    return (
      <>
        <div
          ref={staticRef}
          className={classNames(styles.root, styles.container, styles[containerWidth])}
        >
          {renderStaticContent()}
          <ProgressBar completion={completion} />
        </div>
        <div
          {...remainder}
          style={{
            height: getHeight(),
          }}
          ref={containerRef}
          onScroll={onScroll}
          className={classNames("scrollbar-hide ", styles.root, className)}
        >
          <div
            className={classNames(
              styles.root,
              styles.container,
              styles[containerWidth],
              styles.padding
            )}
          >
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={classNames(
        styles.root,
        styles.container,
        styles[containerWidth],
        styles.padding,
        className
      )}
      {...remainder}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  containerWidth: "small",
  adjustHeight: 0,
  isTopBarVisible: true,
  initialCompletion: 5,
};
export { Container };
