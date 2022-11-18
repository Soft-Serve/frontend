import { classnames } from "tailwindcss-classnames";

export const root = classnames("-ml-2", "-mr-2", "-mt-2", "mb-4");
export const reverseWrap = classnames("flex", "lg:flex-row", "flex-col-reverse");
export const rowOnMobile = classnames("flex");
export const wrap = classnames("flex-wrap");
export const isMarginless = classnames("mb-0");
export const rows = classnames("block", "flex", "flex-col", "sm:flex-row");
