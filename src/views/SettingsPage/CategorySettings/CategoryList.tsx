import React from "react";
import type { FC } from "react";
import { List, ListItem, SkeletonList } from "@base";
import { Category, Menu } from "@shared";
import { CategoryDropdown } from "./CategoryDropdown";

import { filterCategories } from "src/utility";
import { Box } from "@interface";

enum ModalForms {
  UpdateCategory = "updateCategory",
  DeleteCategory = "deleteCategory",
}

interface Props {
  activeMenu?: Menu;
  categories?: Category[];
  handleModal: (modalForm: ModalForms, category?: Category) => void;
  loading: boolean;
  themeColour: string;
  themeTint: number;
}
const CategoryList: FC<Props> = ({ categories, handleModal, loading, themeColour, themeTint }) => {
  if (loading) {
    return <SkeletonList />;
  }

  return (
    <Box isOverflowVisible className="mt-8">
      <List>
        {filterCategories(categories)?.map(category => (
          <ListItem key={category.id}>
            <div className="flex flex-1 items-end">
              <span className="font-Quicksand font-bold">{category.name}</span>
            </div>
            <div className="ml-4 flex flex-col sm:flex-row">
              <CategoryDropdown
                themeColour={themeColour}
                themeTint={themeTint}
                handleDelete={() => handleModal(ModalForms.DeleteCategory, category)}
                handleUpdate={() => handleModal(ModalForms.UpdateCategory, category)}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { CategoryList };
