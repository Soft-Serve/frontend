import React from "react";
import type { FC } from "react";
import { Button } from "@base";
import { DIETARIES_QUERY, Item, useAllergiesQuery, useDietaryQuery } from "@shared";
import { usePostDietaryMutation } from "./PostDietary.mutation";
import { useDeleteDietaryMutation } from "./DeleteDietary.mutation";
import { LifeStyles } from "src/contexts";

interface Payload {
  dietaryID: string;
  name: string;
}
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
  const { data: itemDietariesData, loading } = useDietaryQuery({
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

  const [postDietary, { loading: isPostLoading }] = usePostDietaryMutation({
    notifyOnNetworkStatusChange: true,
    refetchQueries: [
      {
        query: DIETARIES_QUERY,
        variables: {
          itemID: item?.id || 0,
        },
      },
    ],
  });

  const [deleteDietary, { loading: isDeleteLoading }] = useDeleteDietaryMutation({
    notifyOnNetworkStatusChange: true,
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

  const handleDelete = (name: string) =>
    deleteDietary({
      variables: {
        input: {
          menu_item_id: item?.id || 0,
          dietary: itemDietariesData?.dietaries?.find(allergy => allergy.name === name),
        },
      },
    });

  const handlePost = (dietaryID: string) =>
    postDietary({
      variables: {
        input: {
          menu_id: item?.id || 0,
          dietary_id: Number(dietaryID),
        },
      },
    });

  const handleChange = (payload: Payload) => {
    const { name, dietaryID } = payload || {};
    return isAllergyActive(name) ? handleDelete(name) : handlePost(dietaryID);
  };

  const allergyPrefix = (name: string) =>
    name === LifeStyles.Vegan || name === LifeStyles.Vegeterian ? null : "Contains:";
  return (
    <div className="w-72 sm:w-full">
      <fieldset>
        <legend
          className={`border-2 font-Quicksand text-lg font-bold text-${themeColour}-${themeTint} border-${themeColour}-${themeTint} w-full rounded-md p-2 text-center`}
        >
          Dietary Restrictions
        </legend>
        <div className={`mt-4  border-t  border-${themeColour}-${themeTint} h-80 overflow-scroll`}>
          {restaurantDietariesData?.allergies?.map(allergy => (
            <label
              key={allergy.id}
              htmlFor={`person-${allergy.id}`}
              className={`flex w-full ${
                isPostLoading || isDeleteLoading ? "cursor-wait" : "cursor-pointer"
              } select-none justify-between border-b font-Quicksand font-bold text-gray-700  border-${themeColour}-${themeTint} items-center py-4`}
            >
              <div>
                {allergyPrefix(allergy.name)}{" "}
                <span className={`text-${themeColour}-${themeTint}`}>{allergy.name}</span>
              </div>
              <input
                disabled={loading || isPostLoading || isDeleteLoading}
                onChange={e => handleChange({ dietaryID: e.target.value, name: allergy.name })}
                checked={isAllergyActive(allergy.name)}
                id={`person-${allergy.id}`}
                name={`person-${allergy.id}`}
                type="checkbox"
                value={allergy.id}
                className={`focus:ring-${themeColour}-${themeTint} h-4 w-4 text-${themeColour}-${themeTint} cursor-pointer rounded border-gray-300`}
              />
            </label>
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
