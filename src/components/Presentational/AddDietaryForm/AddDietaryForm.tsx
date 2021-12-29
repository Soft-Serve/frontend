import React, { useState } from "react";
import type { FC } from "react";
import { Button } from "@base";
import { Item, useAllergiesQuery, useDietaryQuery } from "@shared";
import { useRestaurantContext } from "@contexts";
import { RadioGroup } from "@headlessui/react";
import { intersection } from "@utility";

const memoryOptions = [
  { name: "4 GB", inStock: true },
  { name: "8 GB", inStock: true },
  { name: "16 GB", inStock: true },
  { name: "32 GB", inStock: true },
  { name: "64 GB", inStock: true },
  { name: "128 GB", inStock: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  item?: Item;
}

const AddDietaryForm: FC<Props> = ({ item }) => {
  const [mem, setMem] = useState(memoryOptions[2]);
  const { restaurantSlug } = useRestaurantContext();

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

  const isAllergyActiveWithinItem = () => {
    if (itemDietariesData?.dietaries?.length && addDietariesData?.allergies?.length) {
      return intersection(addDietariesData?.allergies, itemDietariesData?.dietaries);
    }
    return false;
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">RAM</h2>
          <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            See performance specs
          </a>
        </div>

        <RadioGroup value={mem} onChange={setMem} className="mt-2">
          <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {addDietariesData?.allergies?.map(option => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    isAllergyActiveWithinItem()
                      ? "cursor-pointer focus:outline-none"
                      : "opacity-25 cursor-not-allowed",
                    active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                    checked
                      ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                      : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                    "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                  )
                }
                disabled={!isAllergyActiveWithinItem()}
              >
                <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <Button>hello</Button>
    </div>
  );
};

export { AddDietaryForm };
