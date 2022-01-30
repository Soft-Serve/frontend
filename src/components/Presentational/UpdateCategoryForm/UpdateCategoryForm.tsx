import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import { Button, Input, RadioTile, RadioTiles, Notification } from "@base";
import { CATEGORIES_QUERY, CategoriesData, Category } from "@shared";

import { XIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import { isNameValid, isNameOnlyNumbers, isNameInputValid, hasBeginningWhiteSpace } from "@utility";
import toast from "react-hot-toast";
import { useUpdateCategoryMutation } from "./UpdateCategory.mutation";

interface Props {
  onCompleted: (state: boolean) => void;
  menuID: number;
  selectedCategory?: Category;
  themeColour: string;
  themeTint: number;
}

const UpdateCategoryForm: FC<Props> = ({
  onCompleted,
  menuID,
  selectedCategory,
  themeColour,
  themeTint,
}) => {
  const [input, setInput] = useState(selectedCategory);
  const [isInputDirty, setIsInputDirty] = useState(false);
  const onSuccess = () => toast.custom(<Notification header="Category succesfully updated!" />);

  const [updateCategory] = useUpdateCategoryMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: updatedCategoryData }) {
      const { categories: currentCategories } = cache.readQuery({
        query: CATEGORIES_QUERY,
        variables: {
          menuID,
        },
      }) as CategoriesData;
      cache.writeQuery({
        query: CATEGORIES_QUERY,
        data: {
          categories: [
            ...currentCategories.map(category =>
              category.id === updatedCategoryData?.updateCategory.id
                ? updatedCategoryData?.updateCategory
                : category
            ),
          ],
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      updateCategory({
        variables: {
          input,
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateCategory: {
            ...input,
          },
        },
      });
    }
  };

  const inputError = () => {
    if (isInputDirty && !input?.name) return <span>Name is required</span>;
    if (input?.name) {
      if (!isInputDirty) return null;
      if (!isNameValid(input.name)) return <span>Name is required</span>;
      if (isNameOnlyNumbers(input.name)) return <span>Name cannot only contain numbers</span>;
      if (hasBeginningWhiteSpace(input.name)) {
        return <span>Name cannot begin with white space</span>;
      }
    }
    return null;
  };

  const isInputChanged =
    input?.name !== selectedCategory?.name ||
    input?.category_type !== selectedCategory?.category_type;

  const isFormValid =
    input?.name &&
    isNameInputValid(input.name) &&
    !hasBeginningWhiteSpace(input.name) &&
    isInputChanged;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="mr-4 font-Quicksand text-sm font-semibold uppercase tracking-wider text-gray-900">
          edit category
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
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-4 w-full">
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
            errors={[inputError()]}
            labelText="Category name:"
            onChange={e => {
              setIsInputDirty(false);
              setInput(prevState => prevState && { ...prevState, name: e.target.value });
            }}
            onBlur={() => {
              if (input?.name.length) setIsInputDirty(true);
            }}
            value={input?.name}
            type="text"
            name="category-name"
            id="category-name"
            required
          />
        </div>
        <RadioTiles
          value={input?.category_type}
          onChange={value =>
            setInput(prevState => prevState && { ...prevState, category_type: value })
          }
        >
          <div className="my-8 flex">
            <RadioTile themeColour={themeColour} themeTint={themeTint} css="w-full" value="food">
              <span className="block w-full text-center font-Quicksand text-sm font-medium">
                Food
              </span>
            </RadioTile>

            <RadioTile
              themeColour={themeColour}
              themeTint={themeTint}
              css={classnames("w-full", "ml-4")}
              value="beverage"
            >
              <span className="block w-full text-center font-Quicksand text-sm font-medium">
                Beverage
              </span>
            </RadioTile>
          </div>
        </RadioTiles>
        <div className="mt-8 w-full">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            disabled={!isFormValid}
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

export { UpdateCategoryForm };
