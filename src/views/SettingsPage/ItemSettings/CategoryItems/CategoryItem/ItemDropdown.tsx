import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";

interface Props {
  handleUpdate: any;
  handleDelete: any;
  handleAllergies?: any;
}

const ItemDropdown: FC<Props> = ({ handleAllergies, handleDelete, handleUpdate }) => {
  return (
    <KebabDropdown>
      <KebabDropdownItem onClick={handleUpdate}>Edit Item</KebabDropdownItem>
      <KebabDropdownItem onClick={handleDelete}>Delete Item</KebabDropdownItem>
      <KebabDropdownItem onClick={handleAllergies}>Add Dietary</KebabDropdownItem>
    </KebabDropdown>
  );
};

export { ItemDropdown };
