import "react-tiny-fab/dist/styles.css";
import React from "react";
import type { FC } from "react";
import { Fab } from "react-tiny-fab";
import { BookOpenIcon } from "@heroicons/react/solid";

interface Props {
  setIsMenuSlideOverOpen: any;
}

const FloatingMenu: FC<Props> = ({ setIsMenuSlideOverOpen }) => {
  return (
    <div className="lg:hidden block">
      <Fab
        text="Menus"
        onClick={() => setIsMenuSlideOverOpen(true)}
        icon={<BookOpenIcon className="text-red-400 bg-white rounded-full p-2" />}
      />
    </div>
  );
};

export { FloatingMenu };
