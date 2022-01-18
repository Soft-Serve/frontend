import React from "react";
import type { FC } from "react";
import { Button } from "@base";
import { DIETARIES_QUERY, Item, useAllergiesQuery, useDietaryQuery } from "@shared";
import { usePostDietaryMutation } from "./PostDietary.mutation";
import { useDeleteDietaryMutation } from "./DeleteDietary.mutation";

interface Props {
  item?: Item;
  onCompleted?: (state: boolean) => void;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const AddDietaryForm: FC<Props> = ({
  item,
  onCompleted,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const { data: itemDietariesData } = useDietaryQuery({
    variables: {
      itemID: item?.id || 0,
    },
  });

  const { data: restaurantDietariesData } = useAllergiesQuery({
    variables: {
      restaurantSlug,
      active: false,
    },
  });

  const [postDietary] = usePostDietaryMutation({
    refetchQueries: [
      {
        query: DIETARIES_QUERY,
        variables: {
          itemID: item?.id || 0,
        },
      },
    ],
  });

  const [deleteDietary] = useDeleteDietaryMutation({
    refetchQueries: [
      {
        query: DIETARIES_QUERY,
        variables: {
          itemID: item?.id || 0,
        },
      },
    ],
  });

  const isAllergyActive = (name: string) =>
    !!itemDietariesData?.dietaries?.find(allergy => allergy.name === name);

  const handleChange = (dietaryID: string, name: string) => {
    if (!isAllergyActive(name)) {
      postDietary({
        variables: {
          input: {
            menu_id: item?.id || 0,
            dietary_id: Number(dietaryID),
          },
        },
      });
    } else {
      deleteDietary({
        variables: {
          input: {
            menu_item_id: item?.id || 0,
            dietary: itemDietariesData?.dietaries?.find(allergy => allergy.name === name),
          },
        },
      });
    }
  };

  return (
    <div>
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 font-Quicksand">
          Dietary Restrictions
        </legend>
        <div className={`mt-4  border-t  border-${themeColour}-${themeTint}  cursor-pointer`}>
          {restaurantDietariesData?.allergies?.map(allergy => (
            <div
              onClick={() => handleChange(allergy.id.toString(), allergy.name)}
              key={allergy.id}
              className={`relative flex items-start py-4 w-full border-b  border-${themeColour}-${themeTint}`}
            >
              <div className="w-full flex-1 text-sm">
                <label
                  htmlFor={`person-${allergy.id}`}
                  className="font-bold text-gray-700 select-none cursor-pointer w-full font-Quicksand"
                >
                  {allergy.name}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  value={allergy.id}
                  onChange={e => handleChange(e.target.value, allergy.name)}
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
        css="mt-8"
      >
        Close
      </Button>
    </div>
  );
};

export { AddDietaryForm };
