import React from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";
import { ViewportContext } from "./ViewportContext";

interface Props {
  children: React.ReactNode;
}

const ViewportProvider: FC<Props> = ({ children }) => {
  const { width, height } = useViewport();

  return <ViewportContext.Provider value={{ width, height }}>{children}</ViewportContext.Provider>;
};

export { ViewportProvider };
