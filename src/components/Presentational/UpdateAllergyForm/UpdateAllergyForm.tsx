import React, { useState, FormEvent } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import { ALLERGIES_QUERY } from "@shared";
import type { AllergyData, Allergy } from "@shared";
import { useGlobalContext } from "src/contexts";
import { XIcon } from "@heroicons/react/solid";
import { useUpdateAllergyMutation } from "./UpdateAllergy.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedAllergy: Allergy;
}

const UpdateAllergyForm: FC<Props> = ({ onCompleted, selectedAllergy }) => {
  const [name, setName] = useState(selectedAllergy.name);
  const [filterName, setFilterName] = useState(selectedAllergy.filter_name);

  const { restaurantSlug } = useGlobalContext();

  const [updateAllergy] = useUpdateAllergyMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: updatedAllergyData }) {
      const { allergies: currentAllergies } = cache.readQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
      }) as AllergyData;
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
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          update dietary
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex-col sm:flex sm:max-w-md">
        <div>
          <Input
            labelText="Name"
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            id="name"
            required
          />
          <Input
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
          <Button isFullwidth size="XXL" type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateAllergyForm };
