import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";

const Main: FC = ({ children }) => {
  return <Providers>{children}</Providers>;
};

export { Main };
