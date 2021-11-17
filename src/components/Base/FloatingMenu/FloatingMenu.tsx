import "react-tiny-fab/dist/styles.css";
import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Fab } from "react-tiny-fab";
import { BookOpenIcon } from "@heroicons/react/solid";

interface Props {
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
}

const FloatingMenu: FC<Props> = ({ setIsMenuSlideOverOpen }) => {
  return (
    <div className="lg:hidden block">
      <Fab
        text="Menus"
        onClick={() => setIsMenuSlideOverOpen(prevState => !prevState)}
        icon={<BookOpenIcon className="text-white bg-gray-900 rounded-full p-2" />}
      />
    </div>
  );
};

export { FloatingMenu };
