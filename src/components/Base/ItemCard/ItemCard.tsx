import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { cardStyles } from "./styles";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isVertical?: boolean;
}

const ItemCard: FC<Props> = ({ children, isVertical = false, ...rest }) => {
  return (
    <div className={cardStyles(isVertical)} {...rest}>
      {children}
    </div>
  );
};

export { ItemCard };
