import { classnames, TArg } from "tailwindcss-classnames";

const column = {
  base: classnames("flex-grow-0", "flex-shrink-0"),
  default: classnames("flex-1"),
  initial: classnames("flex-initial"),
  auto: classnames("flex-auto"),
  none: classnames("flex-none"),
  textCenter: classnames("text-center"),
  textLeft: classnames("text-left"),
  grow: classnames("flex-grow"),
  margin: classnames("m-2"),
};

type TextDirection = "center" | " right " | "left";
type FlexBehavior = "default" | "initial" | "auto" | "none";

const buildStyles = (
  textDirection: TextDirection = "left",
  flexBehavior: FlexBehavior = "default",
  css?: TArg,
  isFullwidth?: boolean,
  isMarginLess = false
) => {
  return classnames(
    column.base,
    column[flexBehavior],
    {
      [column.textCenter]: textDirection === "center",
      [column.grow]: isFullwidth,
      [column.margin]: !isMarginLess,
    },
    css
  );
};

export { buildStyles };
