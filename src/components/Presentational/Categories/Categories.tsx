import React, { SetStateAction, useEffect } from "react";
import type { FC } from "react";
import { Category } from "@shared";
import { SkeletonCategories } from "./SkeletonCategories";
import { RadioGroup } from "@headlessui/react";

interface Props {
  categories?: Category[];
  loading?: boolean;
  setCategoryID: (value: SetStateAction<number>) => void;
  themeFont: string;
  themeColour: string;
  themeTint: number;
  categoryID: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Categories: FC<Props> = ({
  categories,
  loading,
  setCategoryID,
  themeFont,
  themeTint,
  themeColour,
  categoryID,
}) => {
  useEffect(() => {
    if (categories?.[0]?.id) setCategoryID(categories?.[0]?.id);
  }, [setCategoryID, categories]);

  if (loading) return <SkeletonCategories />;
  return (
    <div className="flex ">
      <RadioGroup
        value={categories?.find(cat => cat?.id === categoryID)}
        onChange={currentCategory => setCategoryID(currentCategory?.id || 0)}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="flex w-full ">
          {categories?.map(option => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.id ? "cursor-pointer focus:outline-none" : "opacity-25 cursor-not-allowed",
                  active ? `"ring-2 ring-offset-2 ring-${themeColour}-${themeTint}"` : "",
                  checked
                    ? `bg-${themeColour}-${themeTint} border-transparent text-white hover:bg-${themeColour}-${
                        themeTint + 100
                      }`
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 mx-2"
                )
              }
            >
              <RadioGroup.Label as="p">
                <span className={`font-${themeFont} font-bold text-sm whitespace-nowrap`}>
                  {option.name}
                </span>
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export { Categories };
