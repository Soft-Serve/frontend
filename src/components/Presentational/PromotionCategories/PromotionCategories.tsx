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
      {/* <h3 className="flex items-center font-Quicksand text-lg font-bold">
        <LightningBoltIcon
          className={`mr-2 h-8 w-8 rounded-full border-2 p-2 bg-${themeColour}-${themeTint} text-white`}
        />
        Running promotions
      </h3> */}
      <table className="flex-no-wrap my-5 flex w-full flex-row overflow-visible rounded-md font-Quicksand sm:bg-white">
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
