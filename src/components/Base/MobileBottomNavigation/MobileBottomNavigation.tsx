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
      className={`fixed inset-x-0 bottom-0 z-10 block lg:hidden bg-${themeColour}-${themeTint} rounded-t-md shadow-md`}
    >
      <div className="flex w-full items-center justify-center p-2">{children}</div>
    </section>
  );
};

export { MobileBottomNavigation };
