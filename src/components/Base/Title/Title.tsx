import { FC, createElement, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<Headers> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: FC<Props> = ({ children, type, ...rest }) => {
  const HTag = `${type}` as keyof JSX.IntrinsicElements;

  return createElement(HTag, rest, children);
};

export { Title };
