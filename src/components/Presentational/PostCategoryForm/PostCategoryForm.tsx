import { Button, RadioTiles, RadioTile, Input, Notification } from "@base";
import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import toast from "react-hot-toast";
import { CategoriesData, CATEGORIES_QUERY } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import { isNameValid, isNameOnlyNumbers, isNameInputValid, hasBeginningWhiteSpace } from "@utility";
import { usePostCategoryMutation } from "./PostCategory.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  menuID: number;
}

const PostCategoryForm: FC<Props> = ({ onCompleted, menuID }) => {
  const [name, setName] = useState("");
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [categoryType, setCategoryType] = useState("food");
  const onSuccess = () => toast.custom(<Notification header="Category succesfully added!" />);

  const [postCategory] = usePostCategoryMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: newPostCategoryData }) {
      const { categories } = cache.readQuery({
        query: CATEGORIES_QUERY,
        variables: {
          menuID,
        },
      }) as CategoriesData;
      cache.writeQuery({
        query: CATEGORIES_QUERY,
        variables: {
          menuID,
        },
        data: {
          categories: [...categories, newPostCategoryData?.postCategory],
        },
      });
    },
  });

  const nameError = () => {
    if (!isNameDirty) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    if (hasBeginningWhiteSpace(name)) return <span>Name cannot begin with white space</span>;

    return null;
  };

  const isFormValid = isNameInputValid(name) && !hasBeginningWhiteSpace(name);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCategory({
      variables: {
        input: {
          name,
          category_type: categoryType,
          menu_id: menuID,
          __typename: "Category",
          id: 0,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        postCategory: {
          name,
          category_type: categoryType,
          menu_id: menuID,
          __typename: "Category",
          id: 0,
        },
      },
    });
  };
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
            errors={[nameError()]}
            onBlur={() => {
              if (name.length) setIsNameDirty(true);
            }}
            labelText="Category name:"
            onChange={e => {
              setIsNameDirty(false);
              setName(e.target.value);
            }}
            value={name}
            type="text"
            name="category-name"
            id="category-name"
            required
          />
        </div>
        <RadioTiles value={categoryType} onChange={value => setCategoryType(value)}>
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
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PostCategoryForm };
