import React, { SetStateAction } from "react";
import type { FC } from "react";
import { Category } from "@shared";
import { SkeletonCategories } from "./SkeletonCategories";
import { RadioGroup } from "@headlessui/react";
import { useStyles } from "./styles";
import { ThemeFonts } from "@base";
import { LightningBoltIcon } from "@heroicons/react/solid";

interface Props {
  categories: Category[];
  loading?: boolean;
  setCategory: (value: SetStateAction<Category | undefined>) => void;
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  category?: Category;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Categories: FC<Props> = ({
  categories,
  loading,
  setCategory,
  themeFont,
  themeTint,
  themeColour,
  category,
}) => {
  const { cursorStyles, activeStyles, checkedStyles, baseStyles } = useStyles(
    themeColour,
    themeTint
  );

  const handleChange = (cat: Category) => setCategory(cat);

  if (loading) return <SkeletonCategories />;

  const renderCategories = () =>
    categories.map(option => (
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
          <span className={`font-${themeFont} flex whitespace-nowrap text-sm font-bold`}>
            {option.name}
            {option.has_active_promo && <LightningBoltIcon className="ml-2 h-5 w-5" />}
          </span>
        </RadioGroup.Label>
      </RadioGroup.Option>
    ));

  return (
    <div className="flex ">
      <RadioGroup
        value={categories.find(cat => cat.id === category?.id)}
        onChange={handleChange}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a category</RadioGroup.Label>
        <div className="flex w-full ">{renderCategories()}</div>
      </RadioGroup>
    </div>
  );
};

export { Categories };
