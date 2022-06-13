import React, { FormEvent } from "react";
import type { FC } from "react";
import { Button, Notification } from "@base";
import { XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import {
  PromotionCategory,
  useDeletePromotionCatgegoryMutation,
} from "./DeletePromotionCatgory.mutation";
import {
  PromotionCategoriesData,
  PROMOTIONS_CATEGORIES_QUERY,
} from "../PromotionCategories/PromotionCategories.query";

interface Props {
  promotionID: number;
  onCompleted?: (state: boolean) => void;
  deletedPromotionCategory?: PromotionCategory;
  themeColour: string;
  themeTint: number;
}

const DeletePromotionCategoryForm: FC<Props> = ({
  promotionID,
  onCompleted,
  deletedPromotionCategory,
  themeColour,
  themeTint,
}) => {
  const onSuccess = () => toast.custom(<Notification header="Promotion succesfully deleted!" />);

  const [deletePromotionCategory, { loading }] = useDeletePromotionCatgegoryMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: deletePromotionCategoryData }) {
      const { promotionCategories } =
        cache.readQuery<PromotionCategoriesData>({
          query: PROMOTIONS_CATEGORIES_QUERY,
          variables: {
            promotionID,
          },
        }) ?? {};

      cache.writeQuery<PromotionCategoriesData>({
        query: PROMOTIONS_CATEGORIES_QUERY,
        variables: {
          promotionID,
        },
        data: {
          promotionCategories:
            promotionCategories?.filter(
              cat => cat.id !== deletePromotionCategoryData?.deletePromotionCategory?.id
            ) || [],
        },
      });
    },
  });

  const handleDeleteMenu = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (deletedPromotionCategory) {
      deletePromotionCategory({
        variables: {
          input: {
            ...deletedPromotionCategory,
          },
          promotionID,
        },
      });
    }
  };

  return (
    <form noValidate onSubmit={handleDeleteMenu}>
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Category name:{" "}
          <span className={`font-bold underline text-${themeColour}-${themeTint}`}>
            {deletedPromotionCategory?.menu_category_name}
          </span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <p className="my-8 font-Quicksand text-base text-gray-900 underline">
        all promotion prices within this category will be removed!
      </p>
      <div className="mt-4 flex items-center">
        <div className="mr-2 w-full">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            css="text-center"
          >
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button
            loading={loading}
            themeColour={themeColour}
            themeTint={themeTint}
            size="LG"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export { DeletePromotionCategoryForm };
