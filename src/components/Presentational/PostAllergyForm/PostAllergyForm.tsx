import React, { useState, FormEvent } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import { AllergiesData, ALLERGIES_QUERY, useRestaurantQuery } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { usePostAllergyMutation } from "./PostAllergy.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const PostAllergyForm: FC<Props> = ({ onCompleted, themeColour, themeTint, restaurantSlug }) => {
  const [name, setName] = useState("");
  const [filterName, setFilterName] = useState("");
  const { data } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });

  const [postAllergy] = usePostAllergyMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: newPostAllergyData }) {
      const { allergies } = cache.readQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
      }) as AllergiesData;
      cache.writeQuery({
        query: ALLERGIES_QUERY,
        variables: {
          restaurantSlug,
          active: false,
        },
        data: {
          allergies: [...allergies, newPostAllergyData?.postAllergy],
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postAllergy({
      variables: {
        input: {
          name,
          filter_name: filterName,
          restaurant_id: data?.restaurant?.id,
          __typename: "Allergy",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        postAllergy: {
          name,
          restaurant_id: data?.restaurant?.id,
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
          add new dietary
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
            Add Dietary
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PostAllergyForm };
