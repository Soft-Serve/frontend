import { Button } from "@base";
import { XIcon } from "@heroicons/react/solid";
import { FC, ReactNode } from "react";
import { Column } from "../Column/Column";
import { Columns } from "../Columns/Columns";

interface Props {
  onClose: (isOpen: boolean) => void;
  isPaddingless?: boolean;
  isMarginless?: boolean;
  children: ReactNode;
  themeColour: string;
  themeTint: number;
}

const DialogHeader: FC<Props> = ({
  children,
  onClose,
  isPaddingless,
  isMarginless,
  themeColour,
  themeTint,
}) => (
  <Columns
    isStackingOnMobile={false}
    isMarginless={isMarginless}
    className="!flex-row items-center"
  >
    <Column isPaddingless={isPaddingless} columnWidth="six">
      {children}
    </Column>
    <Column isPaddingless={isPaddingless} columnWidth="small">
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        onClick={() => onClose?.(false)}
        size="S"
      >
        <XIcon className="h-5 w-5" />
      </Button>
    </Column>
  </Columns>
);

DialogHeader.defaultProps = {
  isPaddingless: false,
  isMarginless: false,
};

export { DialogHeader };
