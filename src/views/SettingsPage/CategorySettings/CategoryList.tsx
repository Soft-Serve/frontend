import React from "react";
import type { FC } from "react";
import { Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Category, Menu } from "@shared";
import { CategoryDropdown } from "./CategoryDropdown";
import { classnames } from "tailwindcss-classnames";

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
    <Card css={classnames("mt-4", "overflow-visible")}>
      <CardContent>
        <List>
          {categories
            ?.filter(category => category.name !== "No category")
            ?.map(category => (
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
      </CardContent>
    </Card>
  );
};

export { CategoryList };
