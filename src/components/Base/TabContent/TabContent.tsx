import React from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";
import { Footer } from "@base";
import { container, wrapper } from "./styles";

const TabContent: FC = ({ children }) => {
  const { width } = useViewport();

  const renderDesktopFooter = () => {
    if (width < 1024) return null;
    return <Footer />;
  };

  return (
    <div className={container}>
      <div className={wrapper}>{children}</div>
      {renderDesktopFooter()}
    </div>
  );
};

export { TabContent };
