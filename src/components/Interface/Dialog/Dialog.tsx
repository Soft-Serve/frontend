import classNames from "classnames";
import { Dialog as HeadlessUIDialog } from "@headlessui/react";
import { Modal } from "../Modal";
import { FC, ReactNode } from "react";
import { useTailwindBreakpoints } from "@hooks";
import * as styles from "./Dialog.styles";
import { Box } from "../Box";

interface Props {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  isLarge?: boolean;
  isOverflowVisible?: boolean;
  isOpaque?: boolean;
  children: ReactNode;
  themeColour: string;
  themeTint: number;
}

const Dialog: FC<Props> = ({
  isOpen,
  onClose,
  isLarge,
  isOverflowVisible,
  children,
  isOpaque,
  themeColour,
  themeTint,
}) => {
  const { medium } = useTailwindBreakpoints();

  return (
    <Modal
      themeColour={themeColour}
      themeTint={themeTint}
      isOpen={isOpen}
      onClose={onClose}
      isOpaque={isOpaque}
    >
      <div className={styles.root}>
        <HeadlessUIDialog.Panel
          className={classNames(
            styles.dialogPanel,
            isLarge ? styles.largeWidth : styles.defaultWidth
          )}
        >
          <Box isMarginless isFullscreen={medium.lessThan} isOverflowVisible={isOverflowVisible}>
            {children}
          </Box>
        </HeadlessUIDialog.Panel>
      </div>
    </Modal>
  );
};

Dialog.defaultProps = {
  isLarge: false,
  isOverflowVisible: false,
  isOpaque: true,
};

export { Dialog };
