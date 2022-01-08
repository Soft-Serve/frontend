import React, { FormEvent } from "react";
import type { FC } from "react";
import { ALLERGIES_QUERY, Allergy } from "@shared";
import type { AllergyData } from "@shared";
import { useRestaurantContext } from "@contexts";
import { Button, Column, Columns } from "@base";

import { XIcon } from "@heroicons/react/solid";
import { useDeleteAllergyMutation } from "./DeleteAllergy.mutation";

interface Props {
  themeColour: string;
  themeTint: number;
  onCompleted?: (state: boolean) => void;
  selectedAllergy: Allergy;
}

const DeleteAllergyForm: FC<Props> = ({ onCompleted, selectedAllergy, themeColour, themeTint }) => {
  const { restaurantSlug } = useRestaurantContext();

  const [deleteAllergy] = useDeleteAllergyMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: deletedAllergyData }) {
      const { allergies } = cache.readQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
      }) as AllergyData;
      cache.writeQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
        data: {
          allergies: allergies.filter(
            allergy => allergy.id !== deletedAllergyData?.deleteAllergy.id
          ),
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteAllergy({
      variables: {
        input: {
          id: selectedAllergy.id,
          name: selectedAllergy.name,
          filter_name: selectedAllergy.filter_name,
          __typename: "Allergy",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleteAllergy: {
          id: selectedAllergy.id,
          name: selectedAllergy.name,
          filter_name: selectedAllergy.filter_name,
          __typename: "Allergy",
        },
      },
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Dietary: <span className="font-bold underline text-red-400">{selectedAllergy.name}</span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
          colour="accent"
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-base text-gray-400">
        Are you sure ? You will delete all items within this menu
      </p>

      <Columns>
        <Column isFullwidth>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Cancel
          </Button>
        </Column>
        <Column isFullwidth>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            size="LG"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Delete
          </Button>
        </Column>
      </Columns>
    </form>
  );
};

export { DeleteAllergyForm };
