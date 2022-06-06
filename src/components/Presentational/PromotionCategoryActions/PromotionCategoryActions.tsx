import React, { ChangeEvent, useState } from "react";
import type { FC } from "react";
import {
  PromotionCategoriesData,
  PromotionCategory,
  PROMOTIONS_CATEGORIES_QUERY,
} from "../PromotionCategories/PromotionCategories.query";
import { Input, Dropdown, Button, Notification } from "@base";
import { classnames } from "tailwindcss-classnames";
import { CategoryName } from "@presentational";
import "./styles.css";
import { useUpdatePromotionCatgegoryMutation } from "./UpdatePromotionCategory.mutation";
import toast from "react-hot-toast";

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
  [key: string]: any;
}

const units = {
  percentage: "%",
  amount: "$",
} as MappableObject;

type MappablePromo = PromotionCategory & MappableObject;

interface Props {
  handleDeleteCategoryPromotion: (promoCategory: PromotionCategory) => void;
  promoCategory: MappablePromo;
  themeColour: string;
  themeTint: number;
  promotionID: number;
}
const PromotionCategoryActions: FC<Props> = ({
  promoCategory,
  themeColour,
  themeTint,
  handleDeleteCategoryPromotion,
  promotionID,
}) => {
  const [input, setInput] = useState<MappablePromo>(promoCategory);
  const [isUpdated, setIsUpdated] = useState(true);
  const onSuccess = () => toast.custom(<Notification header="Promotion succesfully updated!" />);

  const isDiscountUpdated = () => {
    if (Object.keys(promoCategory).length === Object.keys(input).length) {
      if (
        !Object.keys(promoCategory).every(
          key =>
            Object.prototype.hasOwnProperty.call(input, key) && input[key] === promoCategory[key]
        )
      ) {
        setIsUpdated(true);
      }
    }
    setIsUpdated(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(prevState => ({
      ...prevState,
      discount: Number(e.target.value),
    }));
    isDiscountUpdated();
  };

  const onDropdownChange = (unit: string) => {
    setInput(prevState => ({ ...prevState, unit }));
    isDiscountUpdated();
  };

  const [updatePromotionCategory, { loading }] = useUpdatePromotionCatgegoryMutation({
    variables: {
      input,
      promotionID,
    },
    onCompleted: () => {
      onSuccess();
      setIsUpdated(true);
    },
    update(cache, { data: updatePromotionCategoryData }) {
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
            promotionCategories?.map(cat =>
              cat.id === updatePromotionCategoryData?.updatePromotionCategory?.id
                ? { ...updatePromotionCategoryData?.updatePromotionCategory }
                : cat
            ) ?? [],
        },
      });
    },
  });

  return (
    <tr
      key={promoCategory.id}
      className={`wrap mb-2 flex flex-none flex-col rounded-md border-b-0 sm:mb-0 sm:table-row sm:border-b-2 border-${themeColour}-${themeTint} font-Quicksand`}
    >
      <td className={`border-2 border-${themeColour}-${themeTint} p-3 font-bold`}>
        <CategoryName categoryID={promoCategory.menu_category_id} />
      </td>
      <td className={`border-2 p-3 border-${themeColour}-${themeTint}`}>
        <fieldset className="flex items-end justify-start font-Quicksand">
          <Input
            css={classnames("rounded-r-none", "border-r-0", "-mr-8", "w-24", "sm:py-2", "py-1.5")}
            onChange={e => handleChange(e)}
            value={input.discount}
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
            defaultValue={units[input?.unit]}
            value={{ name: units[input?.unit] }}
            onChange={(discount: { name: string; id: number; unit: string }) =>
              onDropdownChange(discount.unit)
            }
            data={unitsArray}
          />
        </fieldset>
      </td>
      <td className={`cursor-pointer border-2 p-3  border-${themeColour}-${themeTint}`}>
        <div className="flex w-full">
          <Button
            onClick={() => handleDeleteCategoryPromotion(promoCategory)}
            css="mr-2"
            isFullwidth
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Delete
          </Button>
          <Button
            loading={loading}
            onClick={() => updatePromotionCategory()}
            disabled={isUpdated}
            isFullwidth
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Update
          </Button>
        </div>
      </td>
    </tr>
  );
};

export { PromotionCategoryActions };
