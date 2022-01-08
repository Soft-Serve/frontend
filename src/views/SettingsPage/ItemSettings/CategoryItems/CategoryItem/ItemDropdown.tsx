import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";

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
        Edit Item
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleDelete}>
        Delete Item
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleAllergies}>
        Add Dietary
      </KebabDropdownItem>
    </KebabDropdown>
  );
};

export { ItemDropdown };
