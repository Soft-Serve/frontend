import React, { FormEvent } from "react";
import type { FC } from "react";
import { CATEGORIES_QUERY, Category } from "@shared";
import type { CategoriesData } from "@shared";
import { Button, Notification } from "@base";
import toast from "react-hot-toast";
import { XIcon } from "@heroicons/react/solid";
import { useDeleteCategoryMutation } from "./DeleteCategory.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  menuID: number;
  selectedCategory?: Category;
  themeColour: string;
  themeTint: number;
}

const DeleteCategoryForm: FC<Props> = ({
  onCompleted,
  menuID,
  selectedCategory,
  themeTint,
  themeColour,
}) => {
  const onSuccess = () => toast.custom(<Notification header="Category succesfully removed!" />);
  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: deletedCategoryData }) {
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
          categories: categories.filter(
            category => category.id !== deletedCategoryData?.deleteCategory.id
          ),
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategory) {
      deleteCategory({
        variables: {
          input: {
            ...selectedCategory,
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          deleteCategory: {
            ...selectedCategory,
          },
        },
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Catgeory:{" "}
          <span className="font-bold underline text-red-400">{selectedCategory?.name}</span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
          colour="accent"
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-base text-gray-400">
        Are you sure ? You will delete all items within this menu
      </p>
      <div className="flex items-center mt-4">
        <div className="flex-1 mr-2">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Cancel
          </Button>
        </div>
        <div className="flex-1 mr-2">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            size="LG"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Delete Category
          </Button>
        </div>
      </div>
    </form>
  );
};

export { DeleteCategoryForm };
