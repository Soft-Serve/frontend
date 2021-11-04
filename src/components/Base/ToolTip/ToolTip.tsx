import React, { createRef, ReactNode } from "react";
import type { TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { buildStyles } from "./styles";

type Position = "left" | "right" | "top";

interface Props {
  tooltipText: ReactNode;
  isDisabled?: boolean;
  position?: Position;
  css?: TArg;
}

const Tooltip: FC<Props> = ({ children, tooltipText, isDisabled, position = "top", css }) => {
  const tipRef = createRef<HTMLDivElement>();

  const handleMouseEnter = () => {
    if (tipRef.current) {
      tipRef.current.style.opacity = "1";
      switch (position) {
        case "right":
          tipRef.current.style.marginLeft = "20px";
          break;
        case "left":
          tipRef.current.style.marginRight = "20px";
          break;
        case "top":
          tipRef.current.style.marginBottom = "20px";
          break;
        default:
          tipRef.current.style.margin = "0";
      }
    }
  };
  const handleMouseLeave = () => {
    if (tipRef.current) {
      tipRef.current.style.opacity = "0";
      tipRef.current.style.marginLeft = "10px";
    }
    return null;
  };

  if (isDisabled) {
    return <>{children}</>;
  }

  const PostionsMap = {
    right: {
      left: "100%",
      opacity: 0,
    },
    left: {
      right: "100%",
      opacity: 0,
    },
    top: {
      bottom: "100%",
      opacity: 0,
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  const PointerMap = {
    right: {
      left: "-6px",
      transform: "rotate(45deg)",
    },
    left: {
      right: "-6px",
      transform: "rotate(45deg)",
    },
    top: {
      bottom: "-6px",
      right: "50%",
      transform: "rotate(45deg)",
    },
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={buildStyles(css)} style={PostionsMap[position]} ref={tipRef}>
        <div style={PointerMap[position]} className="bg-black h-3 w-3 absolute" />
        {tooltipText}
      </div>
      {children}
    </div>
  );
};

export { Tooltip };
