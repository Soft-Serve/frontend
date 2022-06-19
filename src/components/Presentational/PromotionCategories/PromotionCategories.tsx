import React, { useState } from "react";
import type { FC } from "react";
import { Modal } from "@base";
import { PromotionCategory, usePromotionCategoriesQuery } from "./PromotionCategories.query";
import {
  DeletePromotionCategoryForm,
  PromotionCategoryActions,
  UpdatePromotionCategoryFrom,
} from "@presentational";

interface Props {
  themeColour: string;
  themeTint: number;
  promotionID: number;
}
interface MappableObject {
  [key: string]: JSX.Element;
}

enum Actions {
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

const PromotionCategories: FC<Props> = ({ themeColour, themeTint, promotionID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<keyof typeof Actions>("DELETE");

  const [selectedPromotionCategory, setSelectedPromotionCategory] = useState<PromotionCategory>();

  const { data } = usePromotionCategoriesQuery({
    variables: {
      promotionID,
    },
    skip: !promotionID,
  });

  const handleDeleteCategoryPromotion = (
    promoCat: PromotionCategory,
    promoAction: keyof typeof Actions
  ) => {
    setSelectedPromotionCategory(promoCat);
    setAction(promoAction);
    setIsOpen(prevState => !prevState);
  };

  const handleUpdateCategoryPromotion = (
    promoCat: PromotionCategory,
    promoAction: keyof typeof Actions
  ) => {
    setSelectedPromotionCategory(promoCat);
    setAction(promoAction);
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

  const UPDATE = (
    <UpdatePromotionCategoryFrom
      promotionID={promotionID}
      promoCat={selectedPromotionCategory}
      themeColour={themeColour}
      themeTint={themeTint}
      onCompleted={setIsOpen}
    />
  );
  const DELETE = (
    <DeletePromotionCategoryForm
      deletedPromotionCategory={selectedPromotionCategory}
      themeColour={themeColour}
      themeTint={themeTint}
      promotionID={promotionID}
      onCompleted={setIsOpen}
    />
  );

  const forms = {
    UPDATE,
    DELETE,
  } as MappableObject;

  return (
    <>
      <Modal onClose={setIsOpen} isOpen={isOpen}>
        {forms[action]}
      </Modal>
      {renderTitle()}
      <table className="flex-no-wrap my-5 flex w-full table-auto flex-row overflow-visible rounded-md font-Quicksand sm:bg-white">
        <tbody className="flex-1 sm:flex-none">
          {data?.promotionCategories?.map(promoCat => (
            <PromotionCategoryActions
              key={promoCat?.id}
              promoCategory={promoCat}
              themeColour={themeColour}
              themeTint={themeTint}
              handleDeleteCategoryPromotion={handleDeleteCategoryPromotion}
              handleUpdateCategoryPromotion={handleUpdateCategoryPromotion}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export { PromotionCategories };
