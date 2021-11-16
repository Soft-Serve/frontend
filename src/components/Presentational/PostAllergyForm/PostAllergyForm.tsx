import React, { useState, FormEvent } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import { ALLERGIES_QUERY, useRestaurantQuery } from "@shared";
import type { AllergyData } from "@shared";
import { useRestaurantContext } from "src/contexts";
import { XIcon } from "@heroicons/react/solid";
import { usePostAllergyMutation } from "./PostAllergy.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
}

const PostAllergyForm: FC<Props> = ({ onCompleted }) => {
  const [name, setName] = useState("");
  const [filterName, setFilterName] = useState("");
  const { restaurantSlug } = useRestaurantContext();
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
      }) as AllergyData;
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
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          add new dietary
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
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PostAllergyForm };
