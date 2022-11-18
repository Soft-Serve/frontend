import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";
import * as styles from "./Modal.styles";

import { FC, ReactNode } from "react";
interface Props {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  isOpaque?: boolean;
  children: ReactNode;
  themeColour: string;
  themeTint: number;
}

const Modal: FC<Props> = ({ isOpen, onClose, isOpaque, children, themeColour, themeTint }) => {
  const opacityCss = isOpaque ? "opacity-75" : "opacity-100";

  return (
    <Transition.Root show={isOpen}>
      <Dialog as="div" className={classNames("z-[100]", styles.dialog)} onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo={opacityCss}
          leave="ease-in duration-200"
          leaveFrom={opacityCss}
          leaveTo="opacity-0"
        >
          <Dialog.Overlay
            className={classNames(styles.overlay(themeColour, themeTint), opacityCss)}
          />
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {children}
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export { Modal };
