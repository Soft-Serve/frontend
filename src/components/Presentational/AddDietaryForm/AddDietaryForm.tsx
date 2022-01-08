import React from "react";
import type { FC } from "react";
import { Button } from "@base";
import { Item, useAllergiesQuery, useDietaryQuery } from "@shared";
import { useRestaurantContext } from "@contexts";

interface Props {
  item?: Item;
  onCompleted?: (state: boolean) => void;
}

const AddDietaryForm: FC<Props> = ({ item, onCompleted }) => {
  const { restaurantSlug, themeColour, themeTint } = useRestaurantContext();

  const { data: itemDietariesData } = useDietaryQuery({
    variables: {
      itemID: item?.id || 0,
    },
  });

  const { data: addDietariesData } = useAllergiesQuery({
    variables: {
      restaurantSlug,
      active: false,
    },
  });

  const isAllergyActive = (name: string) =>
    !!itemDietariesData?.dietaries?.find(allergy => allergy.name === name);

  return (
    <div>
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 font-Quicksand">
          Dietary Restrictions
        </legend>
        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {addDietariesData?.allergies?.map(allergy => (
            <div key={allergy.id} className="relative flex items-start py-4 w-full">
              <div className="w-full flex-1 text-sm">
                <label
                  htmlFor={`person-${allergy.id}`}
                  className="font-medium text-gray-700 select-none cursor-pointer w-full"
                >
                  {allergy.name}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  checked={isAllergyActive(allergy.name)}
                  id={`person-${allergy.id}`}
                  name={`person-${allergy.id}`}
                  type="checkbox"
                  className={`focus:ring-${themeColour}-${themeTint} h-4 w-4 text-${themeColour}-${themeTint} border-gray-300 rounded`}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        onClick={() => onCompleted?.(false)}
        size="XL"
        isFullwidth
        css="mt-2"
      >
        Close
      </Button>
    </div>
  );
};

export { AddDietaryForm };
