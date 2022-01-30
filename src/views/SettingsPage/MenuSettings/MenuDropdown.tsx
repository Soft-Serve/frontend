import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";
import { PencilIcon } from "@heroicons/react/solid";
import { DeleteSVG } from "@svgs";

interface Props {
  handleUpdate: any;
  handleDelete: any;
  themeColour: string;
  themeTint: number;
}

const MenuDropdown: FC<Props> = ({ handleDelete, handleUpdate, themeColour, themeTint }) => {
  return (
    <KebabDropdown themeColour={themeColour} themeTint={themeTint}>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleUpdate}>
        <span className="flex items-center">
          Edit
          <PencilIcon className="ml-2 h-5 w-5" />
        </span>
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleDelete}>
        <span className="flex items-center">
          Delete
          <DeleteSVG className="ml-2 h-5 w-5" />
        </span>
      </KebabDropdownItem>
    </KebabDropdown>
  );
};

export { MenuDropdown };
