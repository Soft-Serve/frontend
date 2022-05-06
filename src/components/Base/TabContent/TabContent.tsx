import React from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";
import { Footer } from "@base";
import { container, wrapper } from "./styles";

interface Props {
  themeColour: string;
  themeTint: number;
  children: React.ReactNode;
}

const TabContent: FC<Props> = ({ children, themeTint, themeColour }) => {
  const { width } = useViewport();

  const renderDesktopFooter = () => {
    if (width < 1024) return null;
    return <Footer themeColour={themeColour} themeTint={themeTint} />;
  };

  return (
    <div className={container}>
      <div className={wrapper}>{children}</div>
      {renderDesktopFooter()}
    </div>
  );
};

export { TabContent };
