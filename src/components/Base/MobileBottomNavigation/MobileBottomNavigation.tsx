import React from "react";
import type { FC } from "react";

interface Props {
  themeColour: string;
  themeTint: number;
}
const MobileBottomNavigation: FC<Props> = ({ children, themeTint, themeColour }) => {
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
