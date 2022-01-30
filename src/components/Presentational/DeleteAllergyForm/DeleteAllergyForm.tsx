import React, { FormEvent } from "react";
import type { FC } from "react";
import { ALLERGIES_QUERY, Allergy } from "@shared";
import { Button, Column, Columns } from "@base";

import { XIcon } from "@heroicons/react/solid";
import { DeleteAllergyData, useDeleteAllergyMutation } from "./DeleteAllergy.mutation";
import { MutationUpdaterFn } from "@apollo/client";
import { AllergiesData } from "src/shared/Allergies.query";

interface Props {
  themeColour: string;
  themeTint: number;
  onCompleted?: (state: boolean) => void;
  selectedAllergy: Allergy;
  restaurantSlug: string;
}

const DeleteAllergyForm: FC<Props> = ({
  onCompleted,
  selectedAllergy,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const updateCache: MutationUpdaterFn<DeleteAllergyData> = (cache, result) => {
    const currentData = cache.readQuery<AllergiesData>({
      query: ALLERGIES_QUERY,
      variables: {
        restaurantSlug,
        active: false,
      },
    });
    if (currentData?.allergies && result.data?.deleteAllergy) {
      const { allergies } = currentData;
      const { deleteAllergy } = result?.data;
      cache.writeQuery<AllergiesData>({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
        data: {
          allergies: allergies.filter(allergy => allergy.id !== deleteAllergy.id),
        },
      });
    }
  };
  const [deleteAllergy] = useDeleteAllergyMutation({
    onCompleted: () => onCompleted?.(false),
    update: updateCache,
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
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Dietary: <span className="font-bold text-red-400 underline">{selectedAllergy.name}</span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
          colour="accent"
        >
          <XIcon className="h-5 w-5" />
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
