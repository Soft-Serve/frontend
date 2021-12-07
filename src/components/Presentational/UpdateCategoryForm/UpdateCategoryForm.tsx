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
}

const UpdateCategoryForm: FC<Props> = ({ onCompleted, menuID, selectedCategory }) => {
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
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          add new category
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-4 w-full">
          <Input
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
          <div className="flex my-4">
            <RadioTile css="w-full" value="food">
              <span className="block text-sm font-medium w-full text-center">Food</span>
            </RadioTile>

            <RadioTile css={classnames("w-full", "ml-4")} value="beverage">
              <span className="block text-sm font-medium w-full text-center">Beverage</span>
            </RadioTile>
          </div>
        </RadioTiles>
        <div className="mt-3 w-full">
          <Button disabled={!isFormValid} isFullwidth size="XXL" type="submit">
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateCategoryForm };
