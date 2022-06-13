import React, { useState } from "react";
import type { FC } from "react";
import { Modal } from "@base";
import { PromotionCategory, usePromotionCategoriesQuery } from "./PromotionCategories.query";
import { DeletePromotionCategoryForm, PromotionCategoryActions } from "@presentational";

interface Props {
  themeColour: string;
  themeTint: number;
  promotionID: number;
}

const PromotionCategories: FC<Props> = ({ themeColour, themeTint, promotionID }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedPromotionCategory, setSelectedPromotionCategory] = useState<PromotionCategory>();

  const { data } = usePromotionCategoriesQuery({
    variables: {
      promotionID,
    },
    skip: !promotionID,
  });

  const handleDeleteCategoryPromotion = (promoCat: PromotionCategory) => {
    setSelectedPromotionCategory(promoCat);
    setIsOpen(prevState => !prevState);
  };

  const renderTitle = () => {
    if (data?.promotionCategories?.length)
      return (
        <h3 className="flex items-center font-Quicksand text-lg font-bold">
          Promotion categories:
        </h3>
      );
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
      {renderTitle()}
      <table className="flex-no-wrap my-5 flex w-full table-auto flex-row overflow-visible rounded-md font-Quicksand sm:bg-white">
        {/* <thead>
          <th className={`border-2 border-${themeColour}-${themeTint} p-3 font-bold`}>Menu</th>
          <th className={`border-2 border-${themeColour}-${themeTint} p-3 font-bold`}>Category</th>
          <th className={`border-2 border-${themeColour}-${themeTint} p-3 font-bold`}>Discount</th>
        </thead> */}
        <tbody className="flex-1 sm:flex-none">
          {data?.promotionCategories?.map(promoCat => (
            <PromotionCategoryActions
              key={promoCat?.id}
              promotionID={promotionID}
              promoCategory={promoCat}
              themeColour={themeColour}
              themeTint={themeTint}
              handleDeleteCategoryPromotion={handleDeleteCategoryPromotion}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export { PromotionCategories };
