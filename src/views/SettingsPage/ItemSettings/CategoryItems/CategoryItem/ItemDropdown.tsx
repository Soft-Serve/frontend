import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";
import { PencilIcon, FilterIcon } from "@heroicons/react/solid";
import { DeleteSVG } from "@svgs";

interface Props {
  handleUpdate: any;
  handleDelete: any;
  handleAllergies?: any;
  themeColour: string;
  themeTint: number;
}

const ItemDropdown: FC<Props> = ({
  handleAllergies,
  handleDelete,
  handleUpdate,
  themeColour,
  themeTint,
}) => {
  return (
    <KebabDropdown themeColour={themeColour} themeTint={themeTint}>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleUpdate}>
        <span className="flex items-center">
          Edit
          <PencilIcon className="w-5 h-5 ml-2" />
        </span>
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleDelete}>
        <span className="flex items-center">
          Delete
          <DeleteSVG className="w-5 h-5 ml-2" />
        </span>
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleAllergies}>
        <span className="flex items-center">
          Update Dietaries
          <FilterIcon className="w-5 h-5 ml-2" />
        </span>
      </KebabDropdownItem>
    </KebabDropdown>
  );
};

export { ItemDropdown };
