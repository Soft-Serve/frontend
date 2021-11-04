import { classnames, TArg } from "tailwindcss-classnames";

type FlexDirection = "column" | "row";

const columns = {
  base: classnames("flex", "w-full", "m-2", "p-2", "h-auto", "items-start", "overflow-y-scroll"),
  column: classnames("flex-col"),
};

const buildStyles = (direction: FlexDirection = "row", css?: TArg) => {
  return classnames(
    columns.base,
    {
      [columns.column]: direction === "column",
    },
    css
  );
};

export { buildStyles };
