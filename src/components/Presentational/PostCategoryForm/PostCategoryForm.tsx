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
  themeColour: string;
  themeTint: number;
}

const PostCategoryForm: FC<Props> = ({ onCompleted, menuID, themeTint, themeColour }) => {
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
      <div className="flex items-center justify-between">
        <h3 className="mr-4 font-Quicksand text-sm font-semibold uppercase tracking-wider text-gray-900">
          add new category
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
        <div className="my-8 w-full">
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
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
          <div className="my-4 flex">
            <RadioTile themeTint={themeTint} themeColour={themeColour} css="w-full" value="food">
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
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PostCategoryForm };
