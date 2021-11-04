import React from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";
import { ViewportContext } from "./ViewportContext";

const ViewportProvider: FC = ({ children }) => {
  const { width, height } = useViewport();

  return <ViewportContext.Provider value={{ width, height }}>{children}</ViewportContext.Provider>;
};

export { ViewportProvider };
