import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Category, Menu } from "@shared";
import { routes } from "@routes";
import { ChevronRightIcon } from "@heroicons/react/solid";
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
  restaurantSlug: string;
}
const CategoryList: FC<Props> = ({
  categories,
  handleModal,
  loading,
  activeMenu,
  themeColour,
  restaurantSlug,
  themeTint,
}) => {
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
                <Link
                  className="w-full py-2 cursor-pointer"
                  to={`${routes.restaurants}/${restaurantSlug}/settings/items?menu=${activeMenu?.name}&category=${category.name}`}
                >
                  <div className="flex-1 flex items-end">
                    <span className="font-bold font-Quicksand">{category.name}</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </Link>
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
