import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";
import { PencilIcon } from "@heroicons/react/solid";
import { DeleteSVG } from "@svgs";
import { Promotion } from "@shared";

interface Props {
  handleUpdate: (promotion: Promotion) => void;
  themeColour: string;
  themeTint: number;
}
const PromotionDropdown: FC<Props> = ({ themeColour, themeTint, handleUpdate }) => {
  return (
    <KebabDropdown themeColour={themeColour} themeTint={themeTint}>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleUpdate}>
        <span className="flex items-center">
          Edit
          <PencilIcon className="ml-2 h-5 w-5" />
        </span>
      </KebabDropdownItem>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint}>
        <span className="flex items-center">
          Delete
          <DeleteSVG className="ml-2 h-5 w-5" />
        </span>
      </KebabDropdownItem>
    </KebabDropdown>
  );
};

export { PromotionDropdown };
