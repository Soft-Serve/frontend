import React, { FC } from "react";
import { Transition } from "@headlessui/react";
import { transition, getFromStyles, getToStyles } from "./styles";

interface Props {
  isVisible: boolean;
  direction?: "x" | "y";
}

const SlideTransition: FC<Props> = ({ children, isVisible, direction = "x" }) => {
  return (
    <Transition
      show={isVisible}
      enter={transition}
      enterFrom={getFromStyles(direction)}
      enterTo={getToStyles(direction)}
      leave={transition}
      leaveFrom={getFromStyles(direction)}
      leaveTo={getToStyles(direction)}
    >
      {children}
    </Transition>
  );
};

export { SlideTransition };
