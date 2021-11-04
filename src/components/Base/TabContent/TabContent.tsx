import React from "react";
import type { FC } from "react";
import { container, wrapper } from "./styles";

const TabContent: FC = ({ children }) => {
  return (
    <div className={container}>
      <div className={wrapper}>{children}</div>
    </div>
  );
};

export { TabContent };
