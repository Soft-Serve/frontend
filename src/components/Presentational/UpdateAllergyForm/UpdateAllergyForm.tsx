import React, { useState, FormEvent } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import { ALLERGIES_QUERY } from "@shared";
import type { Allergy } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { useUpdateAllergyMutation } from "./UpdateAllergy.mutation";
import { AllergiesData } from "src/shared/Allergies.query";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  onCompleted?: (state: boolean) => void;
  selectedAllergy: Allergy;
}

const UpdateAllergyForm: FC<Props> = ({
  onCompleted,
  selectedAllergy,
  themeTint,
  themeColour,
  restaurantSlug,
}) => {
  const [name, setName] = useState(selectedAllergy.name);
  const [filterName, setFilterName] = useState(selectedAllergy.filter_name);

  const [updateAllergy] = useUpdateAllergyMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: updatedAllergyData }) {
      const { allergies: currentAllergies } = cache.readQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
      }) as AllergiesData;
      cache.writeQuery({
        query: ALLERGIES_QUERY,
        data: {
          allergies: [
            ...currentAllergies.map(allergy =>
              allergy.id === updatedAllergyData?.updateAllergy.id
                ? updatedAllergyData?.updateAllergy
                : allergy
            ),
          ],
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAllergy({
      variables: {
        input: {
          id: selectedAllergy.id,
          name,
          filter_name: filterName,
          __typename: "Allergy",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateAllergy: {
          id: selectedAllergy.id,
          name,
          filter_name: filterName,
          __typename: "Allergy",
        },
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          update dietary
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

      <form onSubmit={handleSubmit} className="mt-4 flex-col sm:flex sm:max-w-md">
        <div>
          <Input
            css="mb-4"
            themeColour={themeColour}
            themeTint={themeTint}
            labelText="Name"
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            id="name"
            required
          />
          <Input
            css="mb-4"
            themeColour={themeColour}
            themeTint={themeTint}
            labelText="Filter name"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            type="text"
            name="filterName"
            id="filterName"
            required
          />
        </div>
        <div className="mt-4 rounded-md sm:flex-shrink-0">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            isFullwidth
            size="XXL"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateAllergyForm };
