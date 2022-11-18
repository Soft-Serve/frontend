import { Input, Dropdown, Button } from "@base";
import { XIcon } from "@heroicons/react/solid";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useState } from "react";
import { useViewport } from "src/hooks";
import { classnames } from "tailwindcss-classnames";
import {
  PromotionCategoriesData,
  PromotionCategory,
  PROMOTIONS_CATEGORIES_QUERY,
} from "../PromotionCategories/PromotionCategories.query";
import { useUpdatePromotionCatgegoryMutation } from "./UpdatePromotionCategory.mutation";

interface MappableObject {
  [key: string]: any;
}
type MappablePromo = PromotionCategory & MappableObject;

interface Props {
  themeColour: string;
  themeTint: number;
  onCompleted?: (state: boolean) => void;
  promoCat?: MappablePromo;
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

const UpdatePromotionCategoryFrom: FC<Props> = ({
  themeColour,
  themeTint,
  promoCat,
  promotionID,
  onCompleted,
}) => {
  const { width } = useViewport();
  const [input, setInput] = useState<MappablePromo>({
    id: promoCat?.id ?? 0,
    discount: promoCat?.discount ?? 0,
    unit: promoCat?.unit ?? "",
    promotion_id: promoCat?.promotion_id ?? 0,
    menu_name: promoCat?.menu_name ?? "",
    menu_category_id: promoCat?.menu_category_id ?? 0,
    menu_category_name: promoCat?.menu_category_name ?? "",
    __typename: promoCat?.__typename ?? "PromotionCategories",
  });

  const isPromoUpdated = () => {
    if (promoCat) {
      if (Object.keys(promoCat).length === Object.keys(input).length) {
        return !Object.keys(promoCat).every(
          key => Object.prototype.hasOwnProperty.call(input, key) && input[key] === promoCat[key]
        );
      }
      return false;
    }
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(prevState => ({
      ...prevState,
      discount: Number(e.target.value),
    }));
  };

  const onDropdownChange = (unit: string) => {
    setInput(prevState => ({ ...prevState, unit }));
  };

  const [updatePromotionCategory, { loading }] = useUpdatePromotionCatgegoryMutation({
    onCompleted: () => {
      onCompleted?.(false);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePromotionCategory({
      variables: {
        input,
        promotionID,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex flex-wrap items-end justify-between">
      <div className="flex w-full items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase text-gray-900">
          Update Promotion Details
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
      <fieldset className="mr-4 flex flex-auto flex-wrap items-end justify-start">
        <div className="flex items-end">
          <Input
            onChange={handleChange}
            value={input.discount}
            css={classnames("mr-4", "w-28", "sm:py-2", "py-1.5")}
            labelText="Amount"
            themeColour={themeColour}
            themeTint={themeTint}
            placeholder="10.00"
            min={0}
            step={0.1}
            required
            type="number"
            name="amount"
            id="price"
          />
          <Dropdown
            showCheckmark={false}
            themeColour={themeColour}
            themeTint={themeTint}
            required
            label="Unit"
            value={unitsArray.find(u => u.unit === input?.unit)}
            onChange={(discount: { name: string; id: number; unit: string }) =>
              onDropdownChange(discount.unit)
            }
            data={unitsArray}
          />
        </div>
      </fieldset>
      <div className="mt-8 flex w-full flex-1 justify-end">
        <Button
          isFullwidth={width < 402}
          loading={loading}
          type="submit"
          disabled={!isPromoUpdated()}
          size="XXL"
          themeColour={themeColour}
          themeTint={themeTint}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export { UpdatePromotionCategoryFrom };
