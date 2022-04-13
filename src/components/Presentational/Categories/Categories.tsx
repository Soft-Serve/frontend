import React, { SetStateAction, useEffect } from "react";
import type { FC } from "react";
import { Category } from "@shared";
import { SkeletonCategories } from "./SkeletonCategories";
import { RadioGroup } from "@headlessui/react";
import { useStyles } from "./styles";

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
  const { cursorStyles, activeStyles, checkedStyles, baseStyles } = useStyles(
    themeColour,
    themeTint
  );

  useEffect(() => {
    if (categories?.[0]?.id) setCategoryID(categories?.[0]?.id);
  }, [setCategoryID, categories]);

  if (loading) return <SkeletonCategories />;

  const renderCategories = () =>
    categories?.map(option => (
      <RadioGroup.Option
        key={option.name}
        value={option}
        className={({ active, checked }) =>
          classNames(
            cursorStyles(option.id),
            activeStyles(active),
            checkedStyles(checked),
            baseStyles
          )
        }
      >
        <RadioGroup.Label as="p">
          <span className={`font-${themeFont} whitespace-nowrap text-sm font-bold`}>
            {option.name}
          </span>
        </RadioGroup.Label>
      </RadioGroup.Option>
    ));

  return (
    <div className="flex ">
      <RadioGroup
        value={categories?.find(cat => cat?.id === categoryID)}
        onChange={currentCategory => setCategoryID(currentCategory?.id || 0)}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="flex w-full ">{renderCategories()}</div>
      </RadioGroup>
    </div>
  );
};

export { Categories };
