import React from "react";
import type { FC } from "react";
import { KebabDropdown, KebabDropdownItem } from "@base";
import { ClockIcon, PencilIcon } from "@heroicons/react/solid";
import { DeleteSVG } from "@svgs";
import { Promotion } from "@shared";
import { PromotionCategory } from "./PromotionCategories.query";

interface Props {
  handleUpdate: (promotion: Promotion) => void;
  handleUpdateCategories: (promotionCategories: PromotionCategory[]) => void;
  themeColour: string;
  themeTint: number;
}
const PromotionDropdown: FC<Props> = ({
  themeColour,
  themeTint,
  handleUpdate,
  handleUpdateCategories,
}) => {
  return (
    <KebabDropdown themeColour={themeColour} themeTint={themeTint}>
      <KebabDropdownItem themeColour={themeColour} themeTint={themeTint} onClick={handleUpdate}>
        <span className="flex items-center">
          Edit
          <PencilIcon className="ml-2 h-5 w-5" />
        </span>
      </KebabDropdownItem>
      <KebabDropdownItem
        themeColour={themeColour}
        themeTint={themeTint}
        onClick={handleUpdateCategories}
      >
        <span className="flex items-center">
          Edit Category/Discount
          <ClockIcon className="ml-2 h-5 w-5" />
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
