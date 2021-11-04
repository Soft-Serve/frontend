import React from "react";
import type { FC } from "react";
import { useGlobalContext } from "src/contexts";

const MobileBottomNavigation: FC = ({ children }) => {
  const { themeColour, themeTint } = useGlobalContext();
  return (
    <section
      id="bottom-navigation"
      className={`lg:hidden block fixed inset-x-0 bottom-0 z-10 bg-${themeColour}-${themeTint} shadow-md rounded-t-md`}
    >
      <div className="w-full flex justify-center items-center p-2">{children}</div>
    </section>
  );
};

export { MobileBottomNavigation };
