import React, { ChangeEvent, useState } from "react";
import type { FC } from "react";
import { Input, Dropdown, Button, Modal } from "@base";
import { classnames } from "tailwindcss-classnames";
import { CategoryName } from "../CategoryName";
import { PromotionCategory, usePromotionCategoriesQuery } from "./PromotionCategories.query";
import "./styles.css";
import { DeletePromotionCategoryForm } from "../DeletePromotionCategoryForm";

interface Props {
  themeColour: string;
  themeTint: number;
  promotionID: number;
}

const unitsArray = [
  {
    name: "%",
    unit: "percentage",
    id: 1,
  },
  {
    name: "$",
    unit: "amount",
    id: 2,
  },
];

interface MappableObject {
  [key: string]: string;
}

const units = {
  percentage: "%",
  amount: "$",
} as MappableObject;

const PromotionCategories: FC<Props> = ({ themeColour, themeTint, promotionID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<PromotionCategory[]>([]);
  const [selectedPromotionCategory, setSelectedPromotionCategory] = useState<PromotionCategory>();

  usePromotionCategoriesQuery({
    variables: {
      promotionID,
    },
    skip: !promotionID,
    onCompleted: completedData => setInput(completedData?.promotionCategories),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setInput(prevState => [
      ...prevState.map(prevCat => (prevCat.id === id ? { ...prevCat, [name]: value } : prevCat)),
    ]);
  };

  const onDropdownChange = (unit: string, id: number) => {
    setInput(prevState => [
      ...prevState.map(prevCat => (prevCat.id === id ? { ...prevCat, unit } : prevCat)),
    ]);
  };

  const handleDeleteCategoryPromotion = (promoCat: PromotionCategory) => {
    setSelectedPromotionCategory(promoCat);
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <Modal onClose={setIsOpen} isOpen={isOpen}>
        <DeletePromotionCategoryForm
          deletedPromotionCategory={selectedPromotionCategory}
          themeColour={themeColour}
          themeTint={themeTint}
          promotionID={promotionID}
          onCompleted={setIsOpen}
        />
      </Modal>
      <table className="flex-no-wrap my-5 flex w-full flex-row overflow-visible rounded-md font-Quicksand sm:bg-white">
        <tbody className="flex-1 sm:flex-none">
          {input.map(promoCat => (
            <tr
              key={promoCat.id}
              className="wrap mb-2 flex flex-none flex-col rounded-md border-b-2 sm:mb-0 sm:table-row"
            >
              <td className="rounded-l-md border-2 p-3">
                <CategoryName categoryID={promoCat.menu_category_id} />
              </td>
              <td className="border-2 p-3 ">
                <fieldset className="flex items-end justify-start">
                  <Input
                    css={classnames(
                      "rounded-r-none",
                      "border-r-0",
                      "-mr-8",
                      "w-24",
                      "sm:py-2",
                      "py-1.5"
                    )}
                    onChange={e => handleChange(e, promoCat.id)}
                    value={promoCat.discount}
                    themeColour={themeColour}
                    themeTint={themeTint}
                    placeholder="10.00"
                    min={0}
                    step={0.1}
                    required
                    type="number"
                    name="discount"
                    id="discount"
                  />

                  <Dropdown
                    showCheckmark={false}
                    themeColour={themeColour}
                    themeTint={themeTint}
                    required
                    defaultValue={units[promoCat?.unit]}
                    value={{ name: units[promoCat?.unit] }}
                    onChange={(discount: { name: string; id: number; unit: string }) =>
                      onDropdownChange(discount.unit, promoCat.id)
                    }
                    data={unitsArray}
                  />
                </fieldset>
              </td>
              <td className="hover:text-red-600d cursor-pointer  border-2 p-3 text-red-400 hover:bg-gray-100 hover:font-medium">
                <div className="flex w-full">
                  <Button
                    onClick={() => handleDeleteCategoryPromotion(promoCat)}
                    css="mr-2"
                    isFullwidth
                    themeColour={themeColour}
                    themeTint={themeTint}
                  >
                    Delete
                  </Button>
                  <Button isFullwidth themeColour={themeColour} themeTint={themeTint}>
                    Save
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { PromotionCategories };
